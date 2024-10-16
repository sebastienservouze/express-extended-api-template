import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export abstract class AuthMiddleware {

    public static authenticate(): express.RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                res.status(401).send('Unauthorized');
                return;
            }

            const token = authorizationHeader.split(' ')[1];

            try {
                req.body.user = jwt.verify(token, 'ACCESS SECRET');

                next();
            } catch (e) {
                res.status(401).send('Unauthorized');
            }
        }
    }
}