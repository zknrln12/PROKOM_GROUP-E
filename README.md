# WebGIS NDMI - Edukasi Petani Pangan

Aplikasi WebGIS interaktif untuk mendeteksi kelembaban tanah menggunakan indeks NDMI (Normalized Difference Moisture Index), menampilkan suhu real-time, dan memberikan rekomendasi tanaman yang cocok untuk ditanam. Aplikasi ini dirancang sebagai alat edukasi bagi petani pangan dengan peta interaktif.

## Fitur

- **Peta Interaktif**: Menggunakan Leaflet untuk navigasi peta.
- **Deteksi Kelembaban Tanah**: Berdasarkan NDMI (simulasi).
- **Suhu Real-Time**: Menampilkan suhu simulasi berdasarkan lokasi.
- **Pencarian Lokasi**: Cari lokasi yang ingin ditanami menggunakan geocoder.
- **Rekomendasi Tanaman**: Berdasarkan tingkat kelembaban.
- **Panduan Penggunaan**: Modal dengan instruksi lengkap.
- **Informasi NDMI**: Penjelasan detail tentang indeks NDMI dengan 4 tab informatif (Definisi, Teknis, Aplikasi, Ketahanan Pangan), termasuk formula, penggunaan data Sentinel-2, dan hubungan dengan krisis pangan.
- **Kalkulator NDMI**: Hitung nilai NDMI berdasarkan input NIR dan SWIR secara manual.
- **Desain Menarik**: Menggunakan Bootstrap untuk UI yang responsif dan colorful.

## Cara Menjalankan

### Cara Termudah - Live Server Extension:
1. Buka VS Code, install extension **Live Server**
2. Klik kanan pada `index.html` → "Open with Live Server"
3. Aplikasi akan otomatis buka di `http://localhost:5500`

### Alternatif Lain:
- **Windows Batch**: Double-click file `run_server.bat`
- **Python**: Jalankan `python -m http.server 8000` di terminal
- **Node.js**: Jalankan `node server.js` di terminal

Lihat file `LOCALHOST_SETUP.md` untuk panduan lengkap semua opsi.

### Setelah Server Berjalan:
1. Gunakan search box di navbar untuk mencari lokasi.
2. Klik pada peta untuk mendapatkan informasi NDMI, suhu, dan rekomendasi tanaman.
3. Klik tombol "Panduan" untuk bantuan penggunaan.
4. Klik "Kalkulator NDMI" untuk hitung nilai NDMI manual.
5. Klik "Info NDMI" untuk penjelasan detail tentang indeks.

## Teknologi

- HTML5, CSS3, JavaScript
- Leaflet.js untuk peta interaktif
- Bootstrap 5 untuk desain UI
- Leaflet Control Geocoder untuk pencarian lokasi

## Catatan

- Data NDMI dan suhu saat ini menggunakan simulasi dummy. Untuk implementasi nyata:
  - Integrasikan dengan API satelit seperti Sentinel Hub untuk NDMI.
  - Gunakan API cuaca seperti OpenWeatherMap untuk suhu real-time (perlu API key).
- Aplikasi dapat dikembangkan lebih lanjut dengan data real-time, model AI, atau database tanaman.

## Lisensi

MIT License

MIT License