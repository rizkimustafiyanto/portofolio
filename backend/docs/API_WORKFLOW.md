# API Workflow Guide

Panduan ini fokus ke langkah praktis untuk menambah API baru atau module baru di backend ini.

## Tujuan

Pakai panduan ini kalau kamu ingin:
- menambah field baru di module yang sudah ada
- membuat module baru dari nol
- menambah table baru ke database
- menambahkan resolver, service, dan repository baru

## Pola Dasar

Urutan kerja yang paling aman:
1. Tentukan dulu apakah API itu public atau protected.
2. Tulis schema GraphQL di folder module.
3. Buat DTO untuk input/output layer aplikasi.
4. Buat model GORM untuk database.
5. Buat repository untuk query database.
6. Buat service untuk business logic.
7. Jalankan `gqlgen generate`.
8. Isi resolver yang dihasilkan.
9. Daftarkan dependency service ke bootstrap aplikasi.
10. Tambahkan model ke migrasi kalau perlu.

Kalau field yang ditambahkan adalah aksi bisnis yang perlu histori audit, pastikan resolver atau service juga memanggil `AuditService.Log(...)`.
Pola yang dipakai repo ini:

- tentukan `action` dan `entity`
- isi `requestData` dan `responseData` sebagai JSON string
- gunakan `status` `SUCCESS` atau `FAILED`
- isi `errorMessage` saat ada error
- sertakan `userId` atau `entityId` bila relevan

## Pakai `pkg` Kalau Sudah Ada

Sebelum bikin helper baru, cek dulu apakah sudah ada yang cocok di `pkg/`.

Yang biasanya bisa dipakai ulang:
- `pkg/env` untuk baca environment variable
- `pkg/pagination` untuk normalize `page/limit`, `offset`, dan meta pagination
- `pkg/dto` untuk DTO generik seperti `PaginationDTO`
- `pkg/transaction` untuk transaksi GORM
- `pkg/jwt` untuk generate dan validasi token

Prinsipnya:
- kalau logic dipakai lintas module, taruh di `pkg/`
- kalau logic spesifik domain, taruh di module masing-masing

## Menambah API di Module yang Sudah Ada

Kalau module sudah ada, biasanya cukup lakukan ini:

1. Tambahkan field baru di `internal/modules/<module>/graphql/*.graphqls`.
2. Tentukan apakah field itu public atau protected.
3. Kalau perlu auth, beri directive seperti `@auth` atau directive yang dipakai repo ini.
4. Jalankan `gqlgen generate`.
5. Implement method resolver yang baru muncul.
6. Hubungkan resolver ke service.

## Membuat Module Baru dari Nol

Ikuti urutan ini:

1. Buat folder `internal/modules/<module>/`.
2. Tambahkan subfolder `graphql/`, `dto/`, `model/`, `repository/`, dan `service/`.
3. Tulis schema GraphQL module.
4. Buat DTO untuk input dan output.
5. Buat model database.
6. Buat repository.
7. Buat service.
8. Jalankan `gqlgen generate`.
9. Isi resolver hasil generate.
10. Tambahkan service baru ke `internal/modules/resolver.go`.
11. Tambahkan wiring service/repository ke `cmd/api/main.go`.
12. Tambahkan model ke `internal/database/migrate.go` jika perlu auto migrate.
13. Tambahkan audit hook jika module ini perlu histori aksi bisnis.

## Cara Kerja Resolver

Karena repo ini memakai `follow-schema`, nama file resolver mengikuti schema module.

Contoh:
- `internal/modules/auth/graphql/auth.graphqls` -> resolver di `internal/modules/auth.resolvers.go`
- `internal/modules/project/graphql/project.graphqls` -> resolver di `internal/modules/project.resolvers.go`

Alur saat menambah resolver:
1. Tulis schema dulu.
2. Jalankan `gqlgen generate`.
3. `gqlgen` membuat method resolver yang belum ada.
4. Isi method tersebut dengan panggilan ke service.

Kalau schema belum ada, `gqlgen` belum tahu method apa yang harus dibuat.

## Menambah Table Baru

Kalau fitur baru butuh tabel baru:

1. Tambahkan struct GORM di folder `model`.
2. Tambahkan tag GORM seperlunya.
3. Daftarkan model itu di `internal/database/migrate.go`.
4. Jalankan aplikasi atau migrasi untuk memastikan table terbentuk.

Kalau table baru punya relasi, pastikan:
- foreign key ditulis di model
- field relasi ditulis jelas
- repository memakai `Preload` kalau butuh object relasi ikut terbaca

## Public vs Protected

Untuk GraphQL di repo ini:

- public API tidak pakai directive auth
- protected API diberi directive auth

Jadi saat menulis schema, keputusan public/protected sebaiknya kelihatan langsung di file GraphQL.

## Checklist Cepat

Sebelum commit perubahan baru, cek ini:
- schema sudah ditulis
- DTO sudah sesuai kebutuhan
- model sudah benar
- repository sudah ada
- service sudah ada
- resolver sudah terisi
- bootstrap aplikasi sudah diupdate
- migrasi sudah didaftarkan kalau perlu
- `gqlgen generate` sudah dijalankan

## Contoh Kasus Nyata

- `auth` cocok untuk belajar alur login, DTO boundary, dan auth flow.
- `project` cocok untuk belajar public query dan protected mutation.
- `audit` cocok untuk belajar relasi tabel, pagination, dan histori aksi bisnis.
