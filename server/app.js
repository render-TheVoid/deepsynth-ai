import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoute.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.get('/', (req, res) => {
    res.send("Welcome to DeepSynth AI!");
});

app.use('/chat', chatRoutes);

app.listen(PORT, () => {
    console.log(`The server is currently running at: http://localhost:${PORT}`);
});