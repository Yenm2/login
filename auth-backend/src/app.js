require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;