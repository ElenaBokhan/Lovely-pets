import {Module} from '@nestjs/common';
import {UsersModule} from 'src/users/users.module';
import {AuthController} from 'src/auth/auth.controller';
import {AuthService} from 'src/auth/auth.service';
import {jwtConstants} from 'src/auth/constants';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '15m'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
