import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

const databaseUri = process.env.MONGODB_URI;

if (!databaseUri) {
    console.error("Erro: A variável MONGODB_URI não foi definida no arquivo .env");
    process.exit(1);
}

mongoose.connect(databaseUri)
.then(() => console.log(' 🔥Conectado com sucesso ao MongoDB Atlas!'))
.catch((err: any) => console.error('Erro de conexão com o MongoDB:', err));

        app.listen(5000, () => {
            console.log('🚀 API escutando redondo na porta 5000');
        });
