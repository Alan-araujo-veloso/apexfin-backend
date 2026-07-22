import mongoose, { Schema, Document } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    createAt: { type: Date, default: Date.now }
});
export const User = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map