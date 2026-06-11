# Birthday Surprise — Celestial Bloom Edition

Ini adalah mini project website birthday surprise versi lebih kreatif dan lebih wow. Project ini dibuat dengan HTML, CSS, dan JavaScript biasa, tanpa library tambahan.

## Fitur

- Opening kotak kado 3D
- Kado bisa dibuka dengan tap di browser HP biasa
- Animasi bunga, love, sparkle keluar dari kado
- Transisi masuk ke website utama
- Background aurora + bintang bergerak
- Section bisa discroll ke bawah
- Galeri foto aesthetic
- Taman bunga interaktif, setiap bunga punya pesan
- Timeline doa ulang tahun
- Tombol final surprise dengan confetti dan modal wish
- Tombol musik
- Responsive untuk HP

## Cara menjalankan di VSCode

1. Extract folder project.
2. Buka folder `birthday-surprise-wow-edition` di VSCode.
3. Install extension **Live Server**.
4. Klik kanan file `index.html`.
5. Pilih **Open with Live Server**.

## Cara mengganti nama

Buka file `script.js`, lalu cari bagian ini:

```js
const CONFIG = {
  personName: "My Universe",
```

Ganti `My Universe` dengan nama yang kamu mau, misalnya:

```js
personName: "Alya",
```

## Cara mengganti foto

Masukkan foto kamu ke folder:

```txt
assets/photos/
```

Lalu ganti file berikut dengan foto kamu sendiri:

```txt
foto1.jpg
foto2.jpg
foto3.jpg
foto4.jpg
```

Usahakan nama file tetap sama supaya tidak perlu ubah kode.

## Cara mengganti musik

Masukkan lagu ke folder:

```txt
assets/music/
```

Lalu ubah nama file lagunya menjadi:

```txt
music.mp3
```

Catatan: browser biasanya tidak mengizinkan musik autoplay. Jadi musik akan mulai setelah tombol `music` diklik.

## Cara mengganti ucapan

Buka file `index.html`, lalu edit teks pada bagian:

- section `letter`
- section `reasons`
- section `garden`
- section `timeline`
- section `final`

## Upload ke Vercel singkat

1. Upload folder project ke GitHub.
2. Buka Vercel.
3. Import project dari GitHub.
4. Deploy.
5. Link web akan langsung muncul.

Kalau hanya HTML, CSS, JS biasa seperti project ini, tidak perlu setting framework khusus.
