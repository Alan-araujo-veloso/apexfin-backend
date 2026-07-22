import type { Request, Response, NextFunction } from 'express';
export type AuthRequest = Request & {
    userId?: string;
};
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=authmiddleware.d.ts.map