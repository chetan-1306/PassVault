const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassVault';

async function migratePasswords() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const passwordsCollection = db.collection('passwords');
        const usersCollection = db.collection('users');

        // Get all existing passwords
        const existingPasswords = await passwordsCollection.find({}).toArray();
        console.log(`Found ${existingPasswords.length} existing passwords`);

        if (existingPasswords.length === 0) {
            console.log('No passwords to migrate');
            return;
        }

        // Create a default user for existing passwords
        const defaultUsername = 'default_user';
        const defaultPassword = 'password123'; // Change this to a secure password

        // Check if default user already exists
        let defaultUser = await usersCollection.findOne({ username: defaultUsername });
        
        if (!defaultUser) {
            // Create default user
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            
            defaultUser = {
                username: defaultUsername,
                password: hashedPassword,
                createdAt: new Date()
            };
            
            await usersCollection.insertOne(defaultUser);
            console.log('Created default user:', defaultUsername);
        }

        // Update all existing passwords to belong to the default user
        const updatePromises = existingPasswords.map(password => {
            return passwordsCollection.updateOne(
                { _id: password._id },
                { $set: { username: defaultUsername } }
            );
        });

        await Promise.all(updatePromises);
        console.log('Successfully migrated all passwords to default user');

        // Show the updated passwords
        const updatedPasswords = await passwordsCollection.find({ username: defaultUsername }).toArray();
        console.log(`\nMigrated passwords for user '${defaultUsername}':`);
        updatedPasswords.forEach(pwd => {
            console.log(`- ${pwd.site} (${pwd.username})`);
        });

        console.log(`\nDefault user credentials:`);
        console.log(`Username: ${defaultUsername}`);
        console.log(`Password: ${defaultPassword}`);
        console.log('\n⚠️  IMPORTANT: Change the default password after first login!');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Run migration
migratePasswords(); 