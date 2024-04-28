const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = 'mongodb://cosmosdb-stpm:F2xNFTTx01fUIvTi3yKu6lnuMQnyB1E6F2Rhl07p7vwsuVHhuuXecXO7BsKUlv0epEQzkGvMaeZzACDb3N0edg%3D%3D@cosmosdb-stpm.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-stpm@';

// API endpoint to fetch user role by email
app.get('/api/userRole', async (req, res) => {
  const { email } = req.query;

  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('STPM');
    const users = db.collection('Users');

    // Find user by email and retrieve role
    const user = await users.findOne({ email: email });
    
    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(404).json({ error: 'User not found' });
    }

    // Close MongoDB connection
    client.close();
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
