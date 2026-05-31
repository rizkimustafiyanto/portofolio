# Installation Guide

Panduan ini menjelaskan langkah setup lokal untuk backend ini.

## Requirements

- Go 1.25 atau lebih baru
- PostgreSQL 14+ disarankan
- `git`
- koneksi terminal ke project ini

## Persiapan Database

1. Pastikan PostgreSQL sudah berjalan.
2. Buat database baru, misalnya `mydb`.
3. Siapkan user database jika perlu.

## Setup Environment

Buat file `.env` di root project dengan isi seperti ini:

```env
APP_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydb
DB_SSLMODE=disable
DB_TIMEZONE=UTC
DB_MAX_OPEN_CONNS=10
DB_MAX_IDLE_CONNS=10
JWT_SECRET=secret
```

## Install Dependency

Jalankan:

```bash
go mod download
```

## Menjalankan Aplikasi

Setelah `.env` siap dan database tersedia, jalankan:

```bash
go run ./cmd/api
```

Saat aplikasi start, sistem akan:

- membaca environment dari `.env`
- konek ke PostgreSQL
- menjalankan `AutoMigrate`, termasuk tabel `audit_logs`
- menjalankan HTTP server

## Audit Log

Module audit sudah aktif di aplikasi ini.

- request bisnis penting akan ditulis ke tabel `audit_logs`
- log audit bisa dibaca lewat query `auditLogs`
- field audit yang disimpan mencakup aksi, entity, status, payload request/response, dan error message bila ada

Kalau kamu menambah aksi baru yang penting untuk ditelusuri, pastikan resolver/service-nya ikut memanggil audit logger.

## Build Binary

```bash
go build -buildvcs=false -o ./tmp/main ./cmd/api
```

Flag `-buildvcs=false` dipakai supaya build tidak bergantung pada metadata Git.

## Verifikasi

Kalau server sudah jalan, buka:

- `http://localhost:8080/` untuk GraphQL Playground
- `POST /query` untuk endpoint GraphQL

## Troubleshooting

### VCS status error

Kalau muncul error:

```text
error obtaining VCS status: exit status 128
Use -buildvcs=false to disable VCS stamping.
```

pastikan build memakai `-buildvcs=false`.

### Database gagal konek

Periksa:

- PostgreSQL sedang aktif
- isi `.env` sudah benar
- database `DB_NAME` memang sudah dibuat
