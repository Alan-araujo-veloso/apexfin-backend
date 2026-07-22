import express from 'express';
import { authMiddleware } from '../middlewares/authmiddleware.js';
import { Transaction } from '../models/Transaction.js';
const router = express.Router();
router.get('/', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar transações.', error });
    }
});
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const newTransaction = new Transaction({
            description: description,
            amount: amount,
            type: type,
            userId: req.userId
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao salvar transação.', error });
    }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const transactionId = req.params.id;
        const deleted = await Transaction.findOneAndDelete({
            _id: transactionId,
            userId: req.userId
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Transação não encontrada ou permissão negada.' });
        }
        res.status(200).json({ message: 'Transação deletada com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error ao deletar transação.', error });
    }
});
export default router;
//# sourceMappingURL=transactionRoutes.js.map