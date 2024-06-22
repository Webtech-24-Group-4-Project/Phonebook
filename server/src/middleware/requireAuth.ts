import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../interfaces/authRequest';

export const requireAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.PhonebookAuth;

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        req.userId = id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
};
