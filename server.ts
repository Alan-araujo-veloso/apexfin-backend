const express = require('express');
import type {Request, Response } from 'express';
const mongoose = require('mongoose');
import cors =require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://admin:qwe123@cluster0.l2mgk4h.mongodb.net/barbearia?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
.then(() => console.log(' 🔥Conectado com sucesso ao MongoLocal!'))
.catch((err: any) => console.error('Erro de conexão com o MongoDB:', err));

const TransactionsSchema = new mongoose.Schema({
    description: {type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
        date: {type: Date, default: Date.now }
    });

    const TransactionModel  = mongoose.model('Transaction', TransactionsSchema);

    /*--RotasdaAPI----*/
    app.get('/api/transactions', async (req: Request, res: Response) => {
        try {
            const transaction = await TransactionModel.find().sort({ date: -1 });
            res.json(transaction);
        } catch (error) {
            res.status(500).json({message: 'Erro ao buscar dados.'});
        }
        });

        app.post('/api/transactions', async (req: Request, res: Response) => {
            try {
                const { description, amount, type } = req.body;
                const newTransaction = new TransactionModel({ description, amount, type });
                await newTransaction.save();
    
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao salvar dados.' });
        }});
    
        app.listen(5000, () => {
            console.log('🚀 API escutando redondo na porta 5000');
        });
