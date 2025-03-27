import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {UsersService} from 'src/users/users.service';

@Injectable()
export class JWTRefreshGuard implements CanActivate {
    constructor(private usersServise: UsersService) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const {refresh_token, id} = request.body;

        if (!id) {
            throw new UnauthorizedException('Поле username обязательное');
        }

        if (!refresh_token) {
            throw new UnauthorizedException('Поле refreshToken обязательное');
        }

        const user = this.usersServise.findOneById(id);

        if (!user) {
            throw new UnauthorizedException('Такого пользователя не существует');
        }

        return true;
    }
}
