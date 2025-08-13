// Encryption utilities using Web Crypto API
class PasswordEncryption {
    constructor() {
        this.algorithm = 'AES-GCM';
        this.keyLength = 256;
    }

    // Generate a random salt
    generateSalt() {
        return crypto.getRandomValues(new Uint8Array(16));
    }

    // Generate a key from master password and salt
    async deriveKey(masterPassword, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(masterPassword);
        
        const baseKey = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            baseKey,
            { name: this.algorithm, length: this.keyLength },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // Encrypt data
    async encrypt(data, masterPassword) {
        try {
            const salt = this.generateSalt();
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const key = await this.deriveKey(masterPassword, salt);
            
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                dataBuffer
            );

            // Combine salt, iv, and encrypted data
            const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

            return btoa(String.fromCharCode(...combined));
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Failed to encrypt data');
        }
    }

    // Decrypt data
    async decrypt(encryptedData, masterPassword) {
        try {
            const combined = new Uint8Array(
                atob(encryptedData).split('').map(char => char.charCodeAt(0))
            );

            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const data = combined.slice(28);

            const key = await this.deriveKey(masterPassword, salt);
            
            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                data
            );

            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decryptedData));
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Failed to decrypt data. Check your master password.');
        }
    }

    // Check if master password is correct
    async verifyMasterPassword(encryptedData, masterPassword) {
        try {
            await this.decrypt(encryptedData, masterPassword);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new PasswordEncryption(); 