const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassVault';
const app = express() 
const port = 3000
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
console.log('JWT_SECRET:', JWT_SECRET);

app.use(bodyparser.json());
app.use(cors())


client.connect();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Auth header:', authHeader);
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        console.log('JWT verified user:', user);
        req.user = user;
        next();
    });
};

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        await usersCollection.insertOne(newUser);

        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ 
            message: 'User registered successfully',
            token 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Find user
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            message: 'Login successful',
            token 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

//get the data
app.get('/', authenticateToken, async (req, res) => {
    try {
        console.log('Fetching passwords for user:', req.user.username);
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({ username: req.user.username }).toArray();
        console.log('Found passwords:', findResult);
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ message: 'Failed to fetch passwords' });
    }
})

//save the data
app.post('/', authenticateToken, async (req, res) => {
    try {
        console.log('Saving password for user:', req.user.username);
        console.log('Password data:', req.body);
        const password = req.body;
        password.username = req.user.username; // Add username to password entry
        password.createdAt = new Date(); // Add timestamp
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password);
        console.log('Password saved:', findResult);
        res.send({success: true, result: findResult});
    } catch (error) {
        console.error('Error saving password:', error);
        res.status(500).send({success: false, error: 'Failed to save password'});
    }
})

//delete the data
app.delete('/', authenticateToken, async (req, res) => {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        // Only delete passwords belonging to the authenticated user
        const findResult = await collection.deleteOne({ 
            id: password.id, 
            username: req.user.username 
        });
        res.json({success: true, result: findResult});
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({success: false, error: 'Failed to delete password'});
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})