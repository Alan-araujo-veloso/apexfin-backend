import mongoose, { Document } from 'mongoose';
export interface ITransaction extends Document {
    text: string;
    amount: number;
    type: 'income' | 'expense';
    userId: mongoose.Types.ObjectId;
    createAt: Date;
}
export declare const Transaction: mongoose.Model<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, mongoose.Document<unknown, {}, {
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    [x: number]: unknown;
    [x: symbol]: unknown;
    [x: string]: unknown;
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    [x: number]: {};
    [x: symbol]: {};
    [x: string]: {};
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}>, {
    [x: number]: {};
    [x: symbol]: {};
    [x: string]: {};
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=Transaction.d.ts.map