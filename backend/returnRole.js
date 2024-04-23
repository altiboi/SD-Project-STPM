const express = require('express');
const cors = require('cors');
const fs = require('fs/promises'); // Use fs.promises for async file operations
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const userFilePath = './users.json';

// API endpoint to fetch user role by email
app.get('/api/userRole', async (req, res) => {
  const { email } = req.query;

  try {
    // Read user data from local JSON file
    const userData = await fs.readFile(userFilePath, 'utf8');
    const users = JSON.parse(userData);

    // Find user by email and retrieve role
    const user = users.find(user => user.email === email);
    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
