// server.js
const express = require('express');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

const badJsonFormat  = require('./middlewares/jsonmalFormado');
const morgan = require('morgan');

// Carregar variáveis de ambiente do .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(badJsonFormat);//middleware para todas as requisicoes recebidas
/**
 * Isso limita o tamanho máximo do corpo JSON para 1 MB. 
 * Se o corpo for maior, o servidor rejeitará a requisição com um status 413 Payload Too Large.
 */
app.use(express.json({ limit: '1mb' }));

// Usar Morgan para log de requisições HTTP
app.use(morgan('dev'));

connectDB();

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// Configuração das rotas, etc.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
