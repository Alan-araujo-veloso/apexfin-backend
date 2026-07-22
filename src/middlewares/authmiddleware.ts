import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'asdf2026';

export type AuthRequest = Request & { userId?: string };

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({message: 'Token não fornecido. Acesso negado.'});
}

const parts = authHeader.split(' ');

if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Erro no formato do Token. Use o padrão Bearer.' });
}

const token = parts[1];
try {
const decoded = jwt.verify(token as string, JWT_SECRET as string) as any;

(req as AuthRequest).userId = decoded.id || decoded.userId;

return next();
} catch (err) {
    return res.status(401).json({message: ' Token inválido ou expirado.' });
  }
};