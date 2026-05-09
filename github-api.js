// github-api.js
class GitHubUserManager {
    constructor(config) {
        this.config = config;
        this.apiUrl = `https://api.github.com/repos/${config.OWNER}/${config.REPO}/contents/${config.PATH}`;
        this.currentSha = null;
    }
    
    // Helper untuk encode base64 (browser compatible)
    encodeBase64(str) {
        // Untuk konten UTF-8
        const utf8Bytes = new TextEncoder().encode(str);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
        }
        return btoa(binary);
    }
    
    decodeBase64(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    }
    
    // Mendapatkan file users.json dari GitHub
    async fetchUsersFile() {
        try {
            const response = await fetch(this.apiUrl, {
                headers: {
                    'Authorization': `token ${this.config.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (response.status === 404) {
                // File belum ada, buat baru dengan data default
                return { 
                    users: [
                        {
                            id: 1,
                            username: 'admin',
                            email: 'admin@digical.com',
                            status: 'approved',
                            isAdmin: true,
                            createdAt: new Date().toISOString()
                        }
                    ], 
                    settings: { 
                        adminCode: 'admin123',
                        version: '1.0'
                    } 
                };
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.currentSha = data.sha;
            const content = this.decodeBase64(data.content);
            return JSON.parse(content);
        } catch (error) {
            console.error('Error fetching users file:', error);
            throw error;
        }
    }
    
    // Menyimpan data ke GitHub
    async saveUsersFile(data) {
        try {
            const content = this.encodeBase64(JSON.stringify(data, null, 2));
            
            const body = {
                message: `Update users data - ${new Date().toISOString()}`,
                content: content,
                branch: this.config.BRANCH
            };
            
            if (this.currentSha) {
                body.sha = this.currentSha;
            }
            
            const response = await fetch(this.apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            if (result.content) {
                this.currentSha = result.content.sha;
            }
            
            return true;
        } catch (error) {
            console.error('Error saving users file:', error);
            throw error;
        }
    }
    
    // Mendapatkan semua user
    async getUsers() {
        const data = await this.fetchUsersFile();
        return data.users || [];
    }
    
    // Mendapatkan user by username/email
    async getUserByCredential(credential) {
        const users = await this.getUsers();
        return users.find(u => 
            u.username.toLowerCase() === credential.toLowerCase() || 
            u.email.toLowerCase() === credential.toLowerCase()
        );
    }
    
    // Menambah user baru
    async addUser(userData) {
        const data = await this.fetchUsersFile();
        
        // Cek duplikat
        const exists = data.users.some(u => 
            u.username.toLowerCase() === userData.username.toLowerCase() || 
            u.email.toLowerCase() === userData.email.toLowerCase()
        );
        
        if (exists) {
            return { success: false, message: 'Username atau email sudah terdaftar!' };
        }
        
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            isAdmin: false
        };
        
        data.users.push(newUser);
        
        try {
            await this.saveUsersFile(data);
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    // Update status user
    async updateUserStatus(userId, newStatus) {
        const data = await this.fetchUsersFile();
        const userIndex = data.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'User tidak ditemukan' };
        }
        
        data.users[userIndex].status = newStatus;
        
        try {
            await this.saveUsersFile(data);
            return { success: true, user: data.users[userIndex] };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    // Hapus user
    async deleteUser(userId) {
        const data = await this.fetchUsersFile();
        const userIndex = data.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'User tidak ditemukan' };
        }
        
        const deletedUser = data.users[userIndex];
        data.users.splice(userIndex, 1);
        
        try {
            await this.saveUsersFile(data);
            return { success: true, user: deletedUser };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    // Verifikasi admin
    async verifyAdminCode(code) {
        const data = await this.fetchUsersFile();
        const adminCode = data.settings?.adminCode || 'admin123';
        return code === adminCode;
    }
    
    // Update admin code
    async updateAdminCode(newCode) {
        const data = await this.fetchUsersFile();
        data.settings.adminCode = newCode;
        try {
            await this.saveUsersFile(data);
            return true;
        } catch (error) {
            console.error('Failed to update admin code:', error);
            return false;
        }
    }
}

// Inisialisasi global
let userManager = null;

async function initGitHubManager() {
    if (typeof GITHUB_CONFIG !== 'undefined' && GITHUB_CONFIG.TOKEN) {
        userManager = new GitHubUserManager(GITHUB_CONFIG);
        
        // Test koneksi
        try {
            await userManager.fetchUsersFile();
            console.log('✅ GitHub connection successful');
            return true;
        } catch (error) {
            console.error('❌ GitHub connection failed:', error);
            return false;
        }
    }
    console.error('GITHUB_CONFIG not defined or missing token');
    return false;
}