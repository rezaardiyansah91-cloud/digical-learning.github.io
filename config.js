// config.js
// PERINGATAN: Token ini sudah kadaluarsa/terekspos. Ganti dengan token baru Anda!
const GITHUB_CONFIG = {
    // GANTI DENGAN TOKEN BARU ANDA - Token di bawah sudah tidak aman
    TOKEN: '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',
    
    // Ganti dengan username GitHub Anda
    OWNER: 'rezaardiyansah91-cloud',
    
    // Ganti dengan nama repository Anda
    REPO: 'digital-learning.github.io',
    
    // Path file users.json di repository (akan dibuat otomatis)
    PATH: 'users.json',
    
    // Branch (biasanya 'main' atau 'master')
    BRANCH: 'main'
};

// Untuk keamanan, jangan hardcode token di file production!
// Sebaiknya gunakan environment variable atau GitHub Secrets
console.log('GitHub Config loaded - Token length:', GITHUB_CONFIG.TOKEN ? GITHUB_CONFIG.TOKEN.length : 0);