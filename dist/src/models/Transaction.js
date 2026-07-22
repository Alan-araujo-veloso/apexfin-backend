import mongoose, { Schema, Document } from 'mongoose';
const TransactionSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Por favor, adicione uma descrição']
    },
    amount: {
        type: Number,
        required: [true, 'Por favor, adicione um valor']
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'O tipo deve se income (entrada) ou expense (saída)']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const Transaction = mongoose.model('Transaction', TransactionSchema);
//# sourceMappingURL=Transaction.js.map