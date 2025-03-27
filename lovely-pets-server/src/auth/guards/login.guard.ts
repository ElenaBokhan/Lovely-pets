import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const {email, password} = request.body;
        const user = await this.authService.validateUser(email);

        if (!user) {
            throw new UnauthorizedException('Пользователя с таким email не существует');
        }

        if (user.password !== password) {
            throw new HttpException('Неверный пароль', HttpStatus.BAD_GATEWAY);
        }
        return true;
    }
}
