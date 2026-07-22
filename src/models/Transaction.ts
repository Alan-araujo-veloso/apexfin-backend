import mongoose, {Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    userId: mongoose.Types.ObjectId;
    createAt: Date;
}

const TransactionSchema: Schema = new Schema ({
    description: {
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
