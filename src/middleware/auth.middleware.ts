import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AuthRole} from "../auth/auth-role.enum";

export function authMiddleware(req: Request, res: Response, next: NextFunction, minimalRole?: AuthRole): void {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).send('Unauthorized');
        return;
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        req.body.user = jwt.verify(token, 'ACCESS SECRET');
        if (minimalRole && req.body.user.role < minimalRole) {
            res.status(401).send('Forbidden');
        }

        next();
    } catch (e) {
        res.status(401).send('Unauthorized');
    }
}