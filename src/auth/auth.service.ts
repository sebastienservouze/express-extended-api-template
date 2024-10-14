import {Dependency} from "../../../di/src/public-api";
import {DataSource, Repository} from "typeorm";
import {AuthUser} from "../../../express-api/src/db/auth-user.entity";
import {AccessTokenPayload, RefreshTokenPayload} from "./token.types";
import jwt from "jsonwebtoken";

@Dependency()
export class AuthService {

    private authUserRepository: Repository<AuthUser>

    constructor(dataSource: DataSource) {
        this.authUserRepository = dataSource.getRepository(AuthUser);
    }

    public async signIn(username: string, password: string): Promise<[string, string]> {
        const authUser = await this.authUserRepository.findOneOrFail({
            where: {
                username,
                password
            },
        });

        const accessToken = this.getAccessToken(authUser);
        const refreshToken = this.getRefreshToken({sub: authUser.id.toString()});

        return [accessToken, refreshToken];
    }

    private getAccessToken(authUser: AuthUser): string {
        const payload: AccessTokenPayload = {
            sub: authUser.id.toString(),
            username: authUser.username,
            role: authUser.role,
        };

        return jwt.sign(payload, 'ACCESS SECRET', {expiresIn: '1h'});
    }

    private getRefreshToken(refreshTokenPayload: RefreshTokenPayload): string {
        const payload: RefreshTokenPayload = {
            sub: refreshTokenPayload.sub
        };

        return jwt.sign(payload, 'REFRESH SECRET', {expiresIn: '7d'});
    }
}