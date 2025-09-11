````markdown
# Authentication Project (Monorepo)

Project ini menggunakan **npm workspaces** untuk mengatur 2 module utama:

- **Frontend** → SvelteKit
- **Backend** → (misalnya Express / Node.js)

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

---

✨ Dengan setup workspace ini, dependency bisa dipisahkan sesuai kebutuhan tiap module tapi tetap gampang dikelola dari root.

```

Mau saya tambahin juga contoh **workflow development** (misal: kalau ngedit frontend harus buka `localhost:5173`, backend `localhost:3000`, dll)?
```
