# Backend Portfolio

Backend ini adalah layanan GraphQL untuk portofolio, dibangun dengan Go, GORM, PostgreSQL, dan `gqlgen`.

## Ringkasan

- GraphQL server dengan playground di root `/`
- Endpoint GraphQL di `/query`
- Auth memakai JWT
- Auto migrate database saat aplikasi start
- Struktur kode dipisah per module: `auth`, `project`, dan `audit`
- Request bisnis penting dicatat ke tabel `audit_logs`

## Tech Stack

- Go 1.25+
- GraphQL via `gqlgen`
- PostgreSQL
- GORM
- JWT authentication

## Struktur Project

- `cmd/api` — entrypoint aplikasi
- `internal/config` — load environment
- `internal/server` — setup HTTP server dan GraphQL middleware
- `internal/database` — koneksi database dan migrasi
- `internal/modules/auth` — register, login, user profile
- `internal/modules/project` — project CRUD
- `internal/modules/audit` — audit log
- `pkg` — helper lintas module
- `docs` — panduan arsitektur dan workflow API

## Requirements

- Go 1.25 atau lebih baru
- PostgreSQL 14+ disarankan
- `make` opsional, kalau kamu ingin bikin shortcut command sendiri
- `gqlgen` akan dipakai lewat `go run` / generate workflow
- file `.env` di root project

## Environment Variables

Contoh `.env`:

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

### Keterangan

- `APP_PORT` — port HTTP server
- `DB_HOST` — host PostgreSQL
- `DB_PORT` — port PostgreSQL
- `DB_USER` — user database
- `DB_PASSWORD` — password database
- `DB_NAME` — nama database
- `DB_SSLMODE` — mode SSL PostgreSQL
- `DB_TIMEZONE` — timezone koneksi database
- `DB_MAX_OPEN_CONNS` — jumlah maksimum koneksi terbuka
- `DB_MAX_IDLE_CONNS` — jumlah maksimum koneksi idle
- `JWT_SECRET` — secret untuk signing token JWT

## Instalasi

Panduan install dan setup lokal saya taruh di `docs/INSTALLATION.md` supaya README tetap ringkas.

## Build

```bash
go build -buildvcs=false -o ./tmp/main ./cmd/api
```

Catatan: flag `-buildvcs=false` dipakai supaya build tetap aman di environment yang tidak punya metadata `.git`.

## GraphQL Playground

Setelah server jalan, buka:

- `http://localhost:8080/`

GraphQL endpoint:

- `POST /query`

## GraphQL API

### Auth

- `register`
- `login`
- `updateUser` `@auth`
- `me` `@auth`

### Project

- `projects`
- `project`
- `createProject` `@auth`
- `updateProject` `@auth`
- `deleteProject` `@auth`

### Audit

- `auditLogs`

Audit log ini menyimpan histori aksi bisnis seperti `LOGIN`, `REGISTER`, dan operasi project.
Data yang tersimpan mencakup `action`, `entity`, `status`, `requestData`, `responseData`, dan `errorMessage` bila ada.

## Dokumentasi Tambahan

- `docs/INSTALLATION.md`
- `docs/API_GUIDE.md`
- `docs/API_WORKFLOW.md`
- `docs/API_REFERENCE.md`

## Development Notes

- Schema GraphQL ada per module di `internal/modules/*/graphql`
- Resolver mengikuti pola `follow-schema`
- Model yang perlu dibuat tabelnya didaftarkan di `internal/database/migrate.go`
- Middleware auth dan activity dipasang di `internal/server/server.go`
- Audit hook dipasang di resolver yang menjalankan aksi bisnis utama

## Troubleshooting

### Error `obtaining VCS status`

Kalau muncul error seperti:

```text
error obtaining VCS status: exit status 128
Use -buildvcs=false to disable VCS stamping.
```

pakai flag `-buildvcs=false` saat build, atau pastikan project berada di repo Git yang valid.

### Database gagal connect

Pastikan:

- PostgreSQL sedang jalan
- kredensial di `.env` benar
- database dengan nama yang dipakai sudah dibuat

---
