import {Injectable} from '@nestjs/common';
import {User} from 'src/schemas/users.schemas';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {jwtConstants} from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    generateAccessToken(user: User): {access_token: string} {
        return {
            access_token: this.jwtService.sign({user}),
        };
    }

    generateRefreshToken(userId: string): {refresh_token: string} {
        return {
            refresh_token: this.jwtService.sign({userId}, {secret: jwtConstants.secret, expiresIn: '30d'}),
        };
    }

    async validateUser(email: string): Promise<User | null> {
        const user = await this.usersService.findOne(email);

        if (!user) {
            return null;
        }

        return user;
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            return {error: error.message};
        }
    }

    parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }

    async getUserByTokenData(token: string): Promise<User | null> {
        const parsedTokenData = this.parseJwt(token);

        return await this.usersService.findOne(parsedTokenData.user.username);
    }
}
