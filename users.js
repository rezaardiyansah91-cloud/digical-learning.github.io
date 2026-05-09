// users.js - Edit file ini untuk mengelola user
// Admin bisa menambah, menghapus, atau mengubah status user di sini

const USERS_DATA = {
    // Kode admin untuk login ke panel admin (bisa diubah)
    adminCode: "admin123",
    
    // Daftar user
    users: [
        {
            id: 1,
            username: "admin",
            email: "admin@digical.com",
            status: "approved",
            isAdmin: true,
            createdAt: "2026-05-09"
        },
        {
            id: 2,
            username: "rezaardiYansah",
            email: "rezaardiYansah91@gmail.com",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 3,
            username: "abdulaziz",
            email: "abdulaziz@example.com",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-09"
        },
        {
            id: 4,
            username: "user1",
            email: "user1@example.com",
            status: "suspended",
            isAdmin: false,
            createdAt: "2026-05-08"
        },
        {
            id: 5,
            username: "budi",
            email: "budi@example.com",
            status: "approved",
            isAdmin: false,
            createdAt: "2026-05-07"
        }
    ]
};
