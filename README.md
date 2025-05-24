# Information Retrieval Frontend

Frontend aplikasi Information Retrieval berbasis React + Vite yang menyediakan fitur pencarian, penelusuran hasil, dan AI summarization.

##  Cara Menjalankan Aplikasi

1. **Masuk ke VM (DigitalOcean) via SSH:**
   ```bash
   ssh root@143.198.220.249
   ```

2. **Pindah ke direktori proyek frontend:**
   ```bash
   cd ~/ir-frontend
   ```

3. **Install dependensi dan build aplikasi:**
   ```bash
   npm install
   npm run build
   ```

4. **Jalankan aplikasi menggunakan PM2:**
   ```bash
   pm2 start npx --name frontend -- serve -s dist -l 80
   pm2 save
   pm2 startup
   ```

5. **Akses aplikasi di browser:**
   ```
   http://143.198.220.249/
   ```

---

##  Cara Deployment (Redeploy)

Jika ada perubahan kode dan ingin di-deploy ulang:

```bash
cd ~/ir-frontend
git pull origin main      # jika menggunakan Git
npm install               # jika ada perubahan dependensi
npm run build
pm2 restart frontend
```

---

##  Contoh Penggunaan Aplikasi

###  Halaman Search Bar
User dapat menginput query di kolom pencarian.

![image](https://github.com/user-attachments/assets/f513bed9-7f1b-44e7-9b11-1438908cc0e6)


---

###  Hasil Pencarian
Setelah query dikirim, hasil akan langsung ditampilkan di halaman yang sama.

![image](https://github.com/user-attachments/assets/6ffbc74f-2449-45bb-9b21-82c685740dbf)


---

###  Halaman Detail
User dapat mengklik salah satu hasil untuk melihat detailnya, termasuk jawaban-jawaban terkait.

![image](https://github.com/user-attachments/assets/eea430df-c223-4312-9412-0d2375f5063f)


---

###  AI Summarization
Terdapat tombol **"Generate Summary"** untuk menyajikan ringkasan dari seluruh jawaban yang ditampilkan.

![image](https://github.com/user-attachments/assets/c5df6dd4-b17a-463c-b48d-15fc78f8e060)


---

###  AI Performance – Show Discussion Flow
User dapat menekan tombol **"Show Discussion Flow"** untuk melihat bagaimana AI menyusun analisis berdasarkan struktur pemikiran.

![image](https://github.com/user-attachments/assets/947a4781-0c16-4f95-bbcb-47cdb9124175)


---

##  Struktur Proyek

```
ir-frontend/
├── dist/               
├── src/                
│   ├── App.jsx
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── SearchResults.jsx
│   │   └── QuestionDetail.jsx
├── index.html
├── package.json
└── vite.config.js
```

---
