import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const router = Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Este email já está cadastrado.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Erro ao cadastrar usuário!', error
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
        }
        const token = jwt.sign({ id: user._id }, "asdf2026", { expiresIn: '1d' });
        return res.json({
            message: 'Login realizado com sucesso ',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Erro ao realizar login.', error
        });
    }
});
export default router;
//# sourceMappingURL=authRoutes.js.map