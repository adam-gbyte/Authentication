# Authentication Project (Monorepo)

Project ini menggunakan **npm workspaces** untuk mengatur 2 module utama:

- **Frontend** → SvelteKit
- **Backend** → Express / Node.js

## .env

File **.env** di Backend 

```env
PORT = 4000
MONGO_URI = mongodb://localhost:27017/jwt_auth_rbac
JWT_ACCESS_SECRET = change_this_to_a_long_random_secret
JWT_REFRESH_SECRET = another_long_random_secret
ACCESS_TOKEN_EXPIRES_IN = 15m
REFRESH_TOKEN_EXPIRES_IN = 7d
BCRYPT_SALT_ROUNDS = 12
NODE_ENV = development
CLIENT_ORIGIN = http://localhost:5173

EMAIL_USER = example@gmail.com
EMAIL_PASS = Pass_email
```

File **.env** di Frontend

```env
VITE_API_URL = http://localhost:4000/api
```

## 📦 Instalasi

Jalankan di root project:

```bash
npm install
````

Command ini akan otomatis install dependency untuk **Frontend** dan **Backend** karena menggunakan workspace.

## 🚀 Menjalankan Project

```bash
npm start
```

Script ini akan menjalankan **Frontend** dan **Backend** secara bersamaan dengan bantuan [concurrently](https://www.npmjs.com/package/concurrently).

## 📌 Menambah Modul

* Install modul ke **Backend**:

  ```bash
  npm install modulku --workspace Backend
  ```

* Install modul ke **Frontend**:

  ```bash
  npm install modulku --workspace Frontend
  ```

* Install modul ke **root** (biasanya untuk tools linting, testing, dll):

  ```bash
  npm install modulku
  ```

## ❌ Menghapus Modul

* Hapus modul dari **Backend**:

  ```bash
  npm uninstall modulku --workspace Backend
  ```

* Hapus modul dari **Frontend**:

  ```bash
  npm uninstall modulku --workspace Frontend
  ```

* Hapus modul dari **root**:

  ```bash
  npm uninstall modulku
  ```

## 📂 Struktur Project

```
Authentication/
│
├── Backend/       # Service backend (API, auth, dll)
│   └── src/
│
├── Frontend/      # Aplikasi frontend (SvelteKit)
│   └── src/
│
├── node_modules/  # Berisi dependency shared (workspace)
├── package.json   # Workspace config + root scripts
└── README.md
```
