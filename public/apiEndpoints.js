// File: /public/apiEndpoints.js

const apiCategories = [
    {
        category: "Search",
        endpoints: [
            {
                method: "GET",
                path: "/api/search/playstore",
                description: "Mencari aplikasi di Google Play Store berdasarkan query.",
                status: "ready",
                parameters: [
                    { name: "q", type: "text", required: true, placeholder: "e.g., Free Fire" }
                ]
            },
            // NANTI, JIKA ADA API BARU, TAMBAHKAN DI SINI
            // {
            //     method: "GET",
            //     path: "/api/search/youtube",
            //     description: "Mencari video di YouTube.",
            //     status: "development",
            //     parameters: [
            //         { name: "query", type: "text", required: true, placeholder: "e.g., Tutorial Coding" }
            //     ]
            // }
        ]
    },
    {
        category: "AI",
        // Daftar endpoint anime bisa ditambahkan di sini
        endpoints: []
    }
];
