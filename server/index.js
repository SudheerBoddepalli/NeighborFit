app.post('/api/match', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('neighborfit');
    const neighborhoods = await db.collection('neighborhoods').find({}).toArray();

    const { safety = 0, affordability = 0, cafes = 0 } = req.body;

    const totalWeight = safety + affordability + cafes;

    // Edge case: no weight provided
    if (totalWeight === 0) {
      return res.status(400).json({ error: 'Please provide at least one preference.' });
    }

    // Edge case: no neighborhoods in DB
    if (!neighborhoods || neighborhoods.length === 0) {
      return res.status(500).json({ error: 'No neighborhood data found.' });
    }

    const scores = neighborhoods.map(n => {
      const score = (
        (n.safety ?? 0) * safety +
        (n.affordability ?? 0) * affordability +
        (n.cafes ?? 0) * cafes
      ) / totalWeight;
      return { name: n.name || 'Unknown', score };
    }).sort((a, b) => b.score - a.score);

    res.json(scores.slice(0, 3));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
