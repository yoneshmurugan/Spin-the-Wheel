
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend port (changed from 3001)
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// POST route for spinning the wheel: captures name/email, assigns unique number, enforces no repeats
app.post('/api/spin', async (req, res) => {
  const { userName, userEmail } = req.body;

  if (!userName || !userEmail) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Check if the user has already spun (using email as unique identifier)
    const existing = await prisma.spinResult.findFirst({ where: { userEmail } });
    if (existing && existing.userName) {
      return res.status(409).json({ message: 'You already spun the wheel.', number: existing.segment });
    }

    // Fetch unallocated numbers (where userName is empty)
    const unallocated = await prisma.spinResult.findMany({ where: { userName: '' } });
    if (unallocated.length === 0) {
      return res.status(410).json({ message: 'All numbers have been allocated.' });
    }

    // Pick a random unallocated number
    const chosen = unallocated[Math.floor(Math.random() * unallocated.length)];

    // Update the record with user details
    await prisma.spinResult.update({
      where: { id: chosen.id },
      data: { userName, userEmail },
    });

    res.json({ number: chosen.segment });
  } catch (error) {
    console.error('Error processing spin:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET route to fetch all spin results (for admin/testing)
app.get('/api/spins', async (req, res) => {
  try {
    const spins = await prisma.spinResult.findMany();
    res.status(200).json(spins);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
});

const port = 3000; // Kept the same, but can be changed if needed
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
