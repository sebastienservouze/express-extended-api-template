import {Request, Response} from "express";
import {Controller, Post} from "@nerisma/express-extended";
import {AuthService} from "../services/Auth.service";

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/')
    public async signIn(req: Request, res: Response) {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).send('Unauthorized');
        }

        const [username, password] = this.getCredentials(authorizationHeader);

        try {
            const [accessToken, refreshToken] = await this.authService.signIn(username, password);

            return res.status(200).json({accessToken, refreshToken});
        } catch (e) {
            return res.status(401).send('Unauthorized');
        }
    }

    private getCredentials(authorizationHeader: string): string[] {
        const base64Credentials = authorizationHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        return credentials.split(':');
    }
}