import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import studentRoutes from './routes/student.route.js'
import authRoutes from './routes/auth.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(clerkMiddleware());

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, _next) => {
    void _next;
    console.error(err);
    res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
