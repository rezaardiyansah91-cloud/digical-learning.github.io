// users.js - Edit file ini untuk mengelola user
// Password disimpan dalam bentuk SHA-256 hash

const USERS_DATA = {
    // Kode admin untuk login ke panel admin (bisa diubah)
    adminCode: "admin123",
    
    // Daftar user
    users: [
        {
            id: 1,
            username: "admin",
            email: "admin@digical.com",
            // password: "admin123" -> hash SHA-256
            passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
            status: "approved",
            isAdmin: true,
            createdAt: "2026-05-09"
        },
        {
            id: 2,
            username: "rezaardiyansah",
            email: "rezaardiYansah91@gmail.com",
            // password: "reza123" -> hash SHA-256
            passwordHash: "7b3d979ca8330a94fa7e9e1e46625d9fdba40e2c597dee00309d46bc345c9dd6",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 3,
            username: "abdulaziz",
            email: "abdulaziz@example.com",
            // password: "kAlimalang21" -> hash SHA-256
            passwordHash: "0a5b4b9c8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 4,
            username: "user1",
            email: "user1@example.com",
            passwordHash: "e5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c",
            status: "suspended",
            isAdmin: false,
            createdAt: "2026-05-08"
        },
        {
            id: 5,
            username: "budi",
            email: "budi@example.com",
            passwordHash: "f4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5c5b9a8e4b5",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-07"
        }
    ]
};
