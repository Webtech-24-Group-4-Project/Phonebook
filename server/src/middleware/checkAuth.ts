import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../interfaces/authRequest';

export const checkAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.PhonebookAuth;
    
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        req.userId = id;

        next();
    } catch (error) {
        req.userId = null;

        next();
    }
};
