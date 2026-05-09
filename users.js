// users.js - Edit file ini untuk mengelola user
// Password ditulis langsung (plain text) - hanya Anda yang akses file ini

const USERS_DATA = {
    // Kode admin untuk login ke panel admin
    adminCode: "admin123",
    
    // Daftar user
    users: [
        {
            id: 1,
            username: "admin",
            email: "admin@digical.com",
            password: "admin123",        // password plain text
            status: "approved",
            isAdmin: true,
            createdAt: "2026-05-09"
        },
        {
            id: 2,
            username: "rezaardiYansah",
            email: "rezaardiYansah91@gmail.com",
            password: "reza123",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 3,
            username: "abdulaziz",
            email: "abdulaziz@example.com",
            password: "kAlimalang21",         // ganti sesuai keinginan
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 4,
            username: "user1",
            email: "user1@example.com",
            password: "user1123",
            status: "suspended",
            isAdmin: false,
            createdAt: "2026-05-08"
        },
        {
            id: 5,
            username: "budi",
            email: "budi@example.com",
            password: "budi123",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-07"
        }
    ]
};
