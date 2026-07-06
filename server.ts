const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const databaseUri = process.env.MONGODB_URI;

if (!databaseUri) {
    console.error("Erro: A variável MONGODB_URI não foi definida no arquivo .env");
    process.exit(1);
}

mongoose.connect(databaseUri)
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
    app.get('/api/transactions', async (req: any, res: any) => {
        try {
            const transaction = await TransactionModel.find().sort({ date: -1 });
            res.json({data: transaction});
        } catch (error: any) {
            res.status(500).json({message: 'Erro ao buscar dados.'});
        }
        });

        app.post('/api/transactions', async (req: any, res: any) => {
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
