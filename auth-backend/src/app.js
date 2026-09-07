const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');
const app = express();

app.use(express.json());
//Conectar rutas con auth
app.use('/api/auth', authRoutes);

module.exports = app;