import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
const port = 3000;
import authRoutes from './auth.js';
import appRoutes from './approutes.js';
import testRoute from './data.js';
import path from 'path';
import env from 'dotenv'
import mongoose from 'mongoose';
import connectDB from '../db.js'

//connect to Db
connectDB()

// 1. CORS FIRST
app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true,
    methods: ['POST', 'GET', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(testRoute)


// 2. Body parsing + cookies
app.use(express.json());
app.use(cookieParser());

// 3. Routes
app.use('/auth', authRoutes);
app.use('/app/user', appRoutes )

app.use(express.static(path.join(process.cwd(), 'public')));

mongoose.connection.once('open', () => {
    console.log('opennnnnn');

    app.listen(port, () => {
        console.log('server is live')
    });
})
