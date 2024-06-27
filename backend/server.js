import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectDB from './connectDB/connectDB.js';
import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import usersRoutes from './routes/users.routes.js';
import { app, server } from './socket/socket.js';

// const app = express();
dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    console.log(chalk.hex('#00ff00').bold(`<--- SERVER RUNNING AT PORT ${PORT} --->`));
    connectDB();
});