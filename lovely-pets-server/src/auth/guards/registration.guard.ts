import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
    constructor(private authServise: AuthService) {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const {username} = request.body;
        const user = await this.authServise.validateUser(username);

        if (user) {
            throw new UnauthorizedException(`Пользователь ${username} уже существует`);
        }

        return true;
    }
}
