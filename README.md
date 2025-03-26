# PassVault - Password Manager 🔑

PassVault is a secure and user-friendly password manager built using **React.js** for the frontend and **Express.js with MongoDB** for the backend. It allows users to store, manage, and retrieve their passwords securely. 🔒

## Features ⭐

- **Securely store passwords**  
- **Toggle password visibility**  
- **Copy password to clipboard**  
- **Edit or delete saved passwords**  
- **Fetch passwords from the backend**  
- **MongoDB integration for data persistence**  
- **React Toast Notifications**  

## Tech Stack 🖥️

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Express.js, MongoDB  
- **Libraries Used:**  
  - `react-toastify` (for notifications)  
  - `uuid` (for unique ID generation)  
  - `cors`, `dotenv`, `body-parser` (for API handling)  

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
| GET    | `/`      | Fetch all saved passwords |
| POST   | `/`      | Save a new password |
| DELETE | `/`      | Delete a password |

## Folder Structure 📂

```
PassVault/               
├── src/                   # React Frontend
│   ├── components/        # UI Components 
│   ├── App.jsx            # Main React app file
│   ├── index.js           # Entry point
│── Backend/               # Backend API
│   ├── server.js          # Express server
│   ├── .env               # Environment variables
│── package.json           # Dependencies
│── README.md              # Project Documentation
```

## Screenshots 📸

![alt text](<Screenshot 2025-03-26 at 11.34.39.png>)

![alt text](<Screenshot 2025-03-26 at 12.10.02.png>)

![alt text](<Screenshot 2025-03-26 at 12.13.09.png>)

## Contributing 🤝

Contributions are welcome! Feel free to submit a PR.  



