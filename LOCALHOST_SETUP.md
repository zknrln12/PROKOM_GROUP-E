# 🚀 Panduan Menjalankan WebGIS NDMI di Localhost

Ada beberapa cara untuk menjalankan aplikasi WebGIS NDMI di localhost. Pilih salah satu sesuai preferensi Anda:

## **Opsi 1: Menggunakan Live Server Extension (PALING MUDAH) ⭐**

### Langkah-langkah:
1. **Buka VS Code** → Klik Extension (atau tekan `Ctrl+Shift+X`)
2. **Cari** "Live Server" dan klik **Install** (oleh Ritwick Dey)
3. **Buka file** `index.html` di VS Code
4. **Klik kanan** pada file → Pilih **"Open with Live Server"**
5. Browser akan otomatis membuka pada `http://localhost:5500`

### Keuntungan:
- ✅ Paling mudah digunakan
- ✅ Auto-refresh saat file berubah
- ✅ Tidak perlu install dependencies
- ✅ Interface yang user-friendly

---

## **Opsi 2: Menggunakan PowerShell (Tanpa Dependencies)**

### Langkah-langkah:
```powershell
# Buka terminal/PowerShell di folder d:\PROKOM
cd d:\PROKOM

# Jalankan perintah berikut:
$PSVersionTable.PSVersion  # Pastikan PowerShell v5+

# Jalankan HTTP server pada port 8000
python -m http.server 8000
```

Kemudian buka browser di `http://localhost:8000`

---

## **Opsi 3: Menggunakan File Batch (Windows)**

### Langkah-langkah:
1. **Double-click** file `run_server.bat` di folder proyek
2. Terminal akan membuka dan menampilkan:
   ```
   Starting server on http://localhost:8000
   ```
3. Buka browser di `http://localhost:8000`
4. Tekan `Ctrl+C` untuk menghentikan server

---

## **Opsi 4: Menggunakan Node.js (Jika Tersedia)**

### Langkah-langkah:
```powershell
# Buka terminal/PowerShell di folder d:\PROKOM
cd d:\PROKOM

# Install dependency (jika belum ada node_modules)
npm init -y

# Jalankan server Node.js
node server.js
```

Kemudian buka browser di `http://localhost:8000`

---

## **Opsi 5: Menggunakan Python HTTP Server Langsung**

### Untuk Python 3:
```powershell
cd d:\PROKOM
python -m http.server 8000
```

### Untuk Python 2:
```powershell
cd d:\PROKOM
python -m SimpleHTTPServer 8000
```

Kemudian buka browser di `http://localhost:8000`

---

## **Troubleshooting**

### Port 8000 sudah digunakan?
Gunakan port yang berbeda:
```powershell
python -m http.server 3000  # Port 3000
python -m http.server 5000  # Port 5000
```

### Live Server tidak tersedia?
Pastikan Anda sudah:
1. Install Live Server extension di VS Code
2. Reload VS Code setelah install
3. Buka file HTML terlebih dahulu

### Permission denied?
Jalankan terminal dengan **Run as Administrator**

---

## **File-file yang Digunakan**

- `index.html` - File utama aplikasi
- `style.css` - Stylesheet
- `script.js` - JavaScript logic
- `run_server.bat` - Batch file untuk Windows
- `server.js` - Node.js server script (optional)

---

## **Verifikasi Aplikasi Berjalan**

Jika server berhasil, Anda akan melihat:
- Navbar dengan tombol "Panduan", "Kalkulator NDMI"
- Peta interaktif Leaflet
- Panel informasi lokasi
- Legenda NDMI di kiri bawah

Aplikasi siap digunakan! 🎉