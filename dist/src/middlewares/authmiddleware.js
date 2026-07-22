import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'asdf2026';
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Erro no formato do Token. Use o padrão Bearer.' });
    }
    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id || decoded.userId;
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: ' Token inválido ou expirado.' });
    }
};
//# sourceMappingURL=authmiddleware.js.map