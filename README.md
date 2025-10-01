# PassVault - Password Manager 🔑

PassVault is a secure and user-friendly password manager built using **React.js** for the frontend and **Express.js with MongoDB** for the backend. It allows users to store, manage, and retrieve their passwords securely. 🔒

## Features ⭐

- **🔐 Master Password Protection** - Secure access with encrypted master password
- **🔒 AES-256-GCM Encryption** - Military-grade encryption for all stored passwords
- **👤 User Authentication** - Secure login system with JWT tokens
- **🔑 Securely store passwords** - All passwords encrypted before storage
- **👁️ Toggle password visibility** - Show/hide passwords as needed
- **📋 Copy password to clipboard** - Easy password copying functionality
- **✏️ Edit or delete saved passwords** - Full CRUD operations
- **🌐 MongoDB integration** - Secure data persistence with encrypted storage
- **🔔 React Toast Notifications** - User-friendly feedback system
- **🛡️ PBKDF2 Key Derivation** - Secure key generation from master password  

## Tech Stack 🖥️

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Express.js, MongoDB  
- **Security:** Web Crypto API, JWT, bcrypt  
- **Libraries Used:**  
  - `react-toastify` (for notifications)  
  - `uuid` (for unique ID generation)  
  - `cors`, `dotenv`, `body-parser` (for API handling)
  - `bcryptjs` (for password hashing)
  - `jsonwebtoken` (for authentication)  

## Installation ⚡

### Clone the repository

```sh
git clone https://github.com/chetan-1306/PassVault.git
cd PassVault
```

### Install dependencies

#### Backend (Express.js)
```sh
cd Backend
npm install
```

#### Frontend (React.js)
```sh
cd PassVault
npm install
```

### Start the backend server 🚀

```sh
cd Backend
node --watch server.js
```

### Start the React frontend 🌐

```sh
cd PassVault
npm run dev
```

The application will be running at `http://localhost:3000/`. ✅

## API Endpoints 🔗

| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/auth/login` | User authentication |
| GET    | `/api/passwords` | Fetch all saved passwords |
| POST   | `/api/passwords` | Save a new password |
| PUT    | `/api/passwords/:id` | Update a password |
| DELETE | `/api/passwords/:id` | Delete a password |

## Folder Structure 📂

```
PassVault/               
├── Client/                # React Frontend
│   ├── src/               # Source code
│   │   ├── components/    # UI Components (Login, Manager, etc.)
│   │   ├── utils/         # Encryption utilities
│   │   ├── App.jsx        # Main React app file
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Project Documentation
├── Backend/               # Backend API
│   ├── server.js          # Express server with auth routes
│   ├── .env               # Environment variables
│   └── package.json       # Backend dependencies
└── migrate-passwords.js   # Migration script for existing passwords
```

## Screenshots 📸

![alt text](<Screenshot 2025-03-26 at 11.34.39.png>)

![alt text](<Screenshot 2025-03-26 at 12.10.02.png>)

![alt text](<Screenshot 2025-03-26 at 12.13.09.png>)

## Security Features 🔐

### Encryption
- **AES-256-GCM**: Military-grade encryption algorithm for all stored passwords
- **PBKDF2**: Password-based key derivation with 100,000 iterations
- **Random Salt & IV**: Unique salt and initialization vector for each encryption
- **Web Crypto API**: Native browser security implementation

### Authentication
- **JWT Tokens**: Secure session management
- **bcrypt Hashing**: Master password hashing with salt
- **Session Expiry**: Automatic token expiration for security

### Data Protection
- **Client-side Encryption**: Passwords encrypted before sending to server
- **Zero-knowledge Architecture**: Server never sees plain text passwords
- **Secure Storage**: Encrypted data stored in MongoDB

## Contributing 🤝

Contributions are welcome! Feel free to submit a PR.  



