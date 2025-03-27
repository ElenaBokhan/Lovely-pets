import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../auth.service';

@Injectable()
export class JWTGuard implements CanActivate {
    constructor(private authServise: AuthService) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async canActivate(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Ошибка авторизации');
        }

        const validToken = this.authServise.verifyToken(token);

        if (validToken?.error) {
            throw new UnauthorizedException(validToken.error);
        }

        return (request.token = token);
    }

    private extractTokenFromHeader(request: Request & {headers: {authorization: string}}): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
