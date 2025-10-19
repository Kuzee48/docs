// File: /api/search/playstore.js

// Menggunakan 'axios' untuk melakukan permintaan HTTP.
// Anda mungkin perlu menambahkannya ke package.json jika belum ada.
// Cukup jalankan `npm install axios`
import axios from 'axios';

export default async function handler(req, res) {
    // Ambil parameter 'q' dari query URL (contoh: ?q=freefire)
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: "Parameter 'q' dibutuhkan."
        });
    }

    try {
        // Request ke API sebenarnya
        const targetUrl = `https://fathurweb.qzz.io/api/search/playstore?q=${q}`;
        const response = await axios.get(targetUrl);

        // Ambil data JSON dari respons
        let data = response.data;

        // --- INI BAGIAN PENTINGNYA ---
        // Ubah nilai 'creator' sesuai permintaan Anda
        if (data && data.creator) {
            data.creator = "Ayam Developer";
        }

        // Kirim kembali data yang sudah dimodifikasi
        res.status(200).json(data);

    } catch (error) {
        // Tangani jika ada error saat request ke API asli
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan pada server."
        });
    }
}
