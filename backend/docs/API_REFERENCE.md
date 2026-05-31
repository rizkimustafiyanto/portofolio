# API Reference

Dokumen ini berisi penjelasan konsep yang sering bikin bingung saat bekerja di backend ini.

## `type` vs `extend type`

Di GraphQL, ada dua cara menulis root type seperti `Query` dan `Mutation`:

- `type Query` / `type Mutation` = mendefinisikan root type untuk pertama kali.
- `extend type Query` / `extend type Mutation` = menambahkan field ke root type yang sudah ada.

Di repo ini:
- `auth` memakai `type Query` dan `type Mutation` karena module ini ikut mendefinisikan root schema awal.
- `project` dan `audit` memakai `extend type Query` / `extend type Mutation` karena mereka hanya menambah field ke root yang sudah ada.

Poin penting:
- `type` dan `extend type` tidak mengubah permission.
- public/protected tetap ditentukan oleh directive seperti `@auth`.
- `extend` hanya cara menulis schema agar modular.

## Directive `@auth`

`@auth` bukan bawaan GraphQL. Itu directive custom yang kita definisikan sendiri.

Alurnya:
1. Directive dideklarasikan di schema GraphQL.
2. `gqlgen` membaca directive saat generate.
3. Implementasinya dipasang di `internal/server/server.go`.
4. Saat field yang diberi directive dipanggil, directive dijalankan sebelum resolver.

Karena itu:
- nama directive bebas
- `@auth` bisa diganti jadi `@secure` kalau schema, server wiring, dan generate ikut diubah

## Public vs Protected API

Pola di repo ini:
- public API tidak pakai directive auth
- protected API pakai directive auth

Middleware auth hanya mengisi `context` kalau token valid.
Resolver atau directive yang menentukan field itu boleh lanjut atau tidak.

## DTO vs Model

Aturan praktis:
- `DTO` dipakai untuk data yang lewat batas layer aplikasi.
- `model` dipakai untuk tabel database dan akses GORM.
- `repository` bekerja dengan `model`.
- `service` boleh menerima `DTO` dari resolver, lalu mengubahnya ke `model`.
- `resolver` sebaiknya tidak berisi logic database.

### Kapan pakai DTO

Pakai `DTO` untuk:
- input GraphQL
- output GraphQL yang tidak sama persis dengan tabel
- filter dan pagination
- payload aplikasi seperti auth response

### Kapan pakai model

Pakai `model` untuk:
- struct GORM
- operasi repository
- migrasi database
- data yang memang merepresentasikan entitas tabel

## `pkg` sebagai Shared Utilities

Folder `pkg/` dipakai untuk helper yang sifatnya lintas modul, jadi tidak perlu ditulis ulang di setiap module.

### `pkg/env`

`pkg/env` dipakai untuk baca environment variable dengan default value dan parsing aman.

Pakai ini dari `internal/config/env.go`, bukan `os.Getenv` langsung di setiap file.

### `pkg/pagination`

`pkg/pagination` berisi helper generik untuk:
- normalisasi `page` dan `limit`
- hitung `offset`
- bangun metadata pagination

Ini dipakai oleh `pkg/dto.PaginationDTO` dan service yang butuh pagination meta.

### `pkg/formatter`

`pkg/formatter` berisi helper formatting yang reusable lintas module.

Saat ini dipakai untuk:
- format `time.Time` ke string standar aplikasi

Kalau ada formatting yang dipakai lebih dari satu module, tempatnya ideal adalah di sini.

### `pkg/convert`

`pkg/convert` berisi helper parsing/konversi generik.

Saat ini dipakai untuk:
- parse `string` ke `uint`
- parse `string` ke `*uint`

### `pkg/text`

`pkg/text` berisi helper manipulasi string generik.

Saat ini dipakai untuk:
- normalisasi status ke format standar
- cek string yang tidak kosong setelah `TrimSpace`

### `pkg/jsonx`

`pkg/jsonx` berisi helper serialisasi JSON generik.

Saat ini dipakai untuk:
- mengubah struct/map menjadi JSON string untuk audit payload

### `pkg/dto`

`pkg/dto` dipakai untuk DTO umum yang bisa dipakai lintas modul.

Saat ini yang paling penting:
- `PaginationDTO` untuk input pagination dasar

### `pkg/response`

`pkg/response` dipakai untuk format response umum, terutama kalau nanti ada endpoint non-GraphQL.

### `pkg/transaction`

`pkg/transaction` berisi helper transaksi GORM yang bisa dipakai lintas service saat butuh operasi atomic.

### `pkg/jwt`

`pkg/jwt` berisi helper generate dan validasi token JWT.

Kalau kamu menemukan logic yang dipakai lebih dari satu module dan tidak spesifik ke satu domain, tempat yang paling cocok biasanya `pkg/`.

## Relasi Table

Di GORM, ada beda antara:
- foreign key column
- relation field

Kalau model hanya punya:

```go
UserID *uint
```

itu baru kolom referensi, belum object relasi.

Kalau mau ambil object relasi, tambahkan field struct relasi dan pakai `Preload` di repository.

Contoh:

```go
User   *authmodel.User `gorm:"foreignKey:UserID;references:ID"`
```

Kalau relasi sudah didefinisikan, repository bisa pakai:

```go
Preload("User")
```

## `gqlgen` dan `follow-schema`

Repo ini memakai `follow-schema`, jadi schema diletakkan per module.

Keuntungannya:
- tiap module punya schema sendiri
- resolver generated mengikuti module yang sama
- struktur lebih gampang dikembangkan

Kalau nambah type GraphQL baru:
- tambahkan mapping di `gqlgen.yml` kalau perlu custom Go type
- jalankan ulang `gqlgen generate`

## Resolver File

File resolver dibuat mengikuti schema module.

Contoh:
- `auth.graphqls` -> resolver auth
- `project.graphqls` -> resolver project

Urutannya:
1. Tulis schema.
2. Jalankan `gqlgen generate`.
3. Isi method resolver hasil generate.

## Middleware

Di repo ini ada dua middleware utama:

- `ActivityMiddleware` untuk logging semua request HTTP ke terminal.
- `AuthMiddleware` untuk membaca token dan mengisi `context`.

Middleware bukan tempat menolak semua request protected secara global.
Keputusan akses biasanya tetap terlihat di schema dan resolver.

## Audit Log

Audit log di repo ini berbeda dari access log:

- `ActivityMiddleware` mencatat request ke log aplikasi.
- `AuditLog` menyimpan riwayat aksi bisnis ke database.

Audit log dipakai untuk melacak event seperti:
- `REGISTER`
- `LOGIN`
- `ME`
- `CREATE_PROJECT`
- `UPDATE_PROJECT`
- `DELETE_PROJECT`
- `LIST_PROJECTS`
- `GET_PROJECT`

### Alur Penyimpanan

Setiap resolver yang diaudit akan:
1. Menyusun payload audit.
2. Memanggil `AuditService.Log(...)`.
3. Menyimpan record ke tabel `audit_logs` melalui repository.

Jika log gagal ditulis, resolver utama tetap boleh lanjut mengembalikan hasil API.
Itu berarti audit log tidak memblokir flow bisnis utama.

### Struktur Data Audit

Field yang disimpan:
- `userId` bila tersedia
- `action`
- `entity`
- `entityId` bila tersedia
- `ipAddress`
- `requestData`
- `responseData`
- `status`
- `errorMessage`
- `createdAt`

`status` biasanya bernilai:
- `SUCCESS`
- `FAILED`

### Endpoint Audit

Audit log bisa dibaca lewat query:

```graphql
auditLogs(filter: AuditFilterInput): AuditLogPagination!
```

Filter yang tersedia:
- `page`
- `limit`
- `action`
- `entity`
- `status`
- `userId`

### Catatan Keamanan

`requestData` dan `responseData` diisi dalam bentuk JSON string.
Kalau ada field sensitif, sebaiknya disaring sebelum dikirim ke audit payload agar tidak tersimpan apa adanya.

### Penempatan Helper Audit

Rekomendasi struktur yang paling cocok di repo ini:

- kalau helper hanya dipakai oleh satu domain, taruh di folder domain itu, misalnya `internal/modules/audit/logger`
- kalau hook dipakai lintas domain dan sifatnya umum, taruh di `internal/pkg/` atau `pkg/`
- hindari menaruh helper audit langsung di file resolver root kalau logic-nya mulai tumbuh

Untuk kasus repo ini, helper audit paling tepat ada di `internal/modules/audit/logger` karena:

- audit adalah domain sendiri
- helper-nya spesifik untuk payload audit
- resolver tetap fokus ke orchestration, bukan utility
- nanti lebih gampang kalau mau tambah redaction, enrichment, atau formatter khusus audit

## Ringkasan Cepat

- `type` = mendefinisikan root schema.
- `extend type` = menambah field ke root schema.
- `@auth` = directive custom untuk field protected.
- `DTO` = shape data di boundary aplikasi.
- `model` = shape data database.
- `Preload` = ambil relasi object di GORM.
- `follow-schema` = schema dan resolver mengikuti module.
- `AuditLog` = histori aksi bisnis yang disimpan ke database.
