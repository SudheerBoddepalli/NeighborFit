const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Persistent MongoDB Connection Setup
let db;

async function connectToDatabase() {
  if (db) return db;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db('neighborfit');
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    throw err;
  }
}

// Match API
app.post('/api/match', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const neighborhoods = await db.collection('neighborhoods').find({}).toArray();

    const { safety = 0, affordability = 0, cafes = 0 } = req.body;
    const totalWeight = safety + affordability + cafes;

    if (totalWeight === 0) {
      return res.status(400).json({ error: 'Please provide at least one preference.' });
    }

    if (!neighborhoods || neighborhoods.length === 0) {
      return res.status(500).json({ error: 'No neighborhood data found.' });
    }

    const scores = neighborhoods.map(n => {
      const score = (
        (n.safety ?? 0) * safety +
        (n.affordability ?? 0) * affordability +
        (n.cafes ?? 0) * cafes
      ) / totalWeight;

      return {
        name: n.name || 'Unknown',
        score,
      };
    }).sort((a, b) => b.score - a.score);

    res.json(scores.slice(0, 3)); // Return top 3
  } catch (err) {
    console.error('❌ Match Route Error:', err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
