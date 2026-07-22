"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authRoutes_ts_1 = __importDefault(require("./routes/authRoutes.ts"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_ts_1.default);
const databaseUri = process.env.MONGODB_URI;
if (!databaseUri) {
    console.error("Erro: A variável MONGODB_URI não foi definida no arquivo .env");
    process.exit(1);
}
mongoose_1.default.connect(databaseUri)
    .then(() => console.log(' 🔥Conectado com sucesso ao MongoDB Atlas!'))
    .catch((err) => console.error('Erro de conexão com o MongoDB:', err));
const TransactionsSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now }
});
const TransactionModel = mongoose_1.default.model('Transaction', TransactionsSchema);
/*--RotasdaAPI----*/
app.get('/api/transactions', async (req, res) => {
    try {
        const transaction = await TransactionModel.find().sort({ date: -1 });
        res.json({ data: transaction });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
});
app.post('/api/transactions', async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const newTransaction = new TransactionModel({ description, amount, type });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao salvar dados.' });
    }
});
app.delete('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        return res.status(200).json({ message: 'Transação deletada com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar dados do servidor.' });
    }
});
app.listen(5000, () => {
    console.log('🚀 API escutando redondo na porta 5000');
});
//# sourceMappingURL=server.js.map