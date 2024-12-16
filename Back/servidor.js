const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
require('dotenv').config({ path: './bd.env' });

app.use(express.json());

const whitelist = ['http://localhost:5173', 'https://inquadra-finalversion-production.up.railway.app'];

app.use(cors({ 
  origin: whitelist, // Origem permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));
// Rotas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const quadraRoutes = require('./routes/quadraRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const authRoutes = require("./routes/authRoutes");

app.use("/img", express.static("img"));

// Usar as rotas
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/quadras', quadraRoutes);
app.use('/reservas', reservaRoutes);
app.use("/reset", authRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  console.log("opa");
  res.send('¡Bienvenido al backend de InQuadra!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
