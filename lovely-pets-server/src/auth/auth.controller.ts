import {Body, Controller, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Response} from 'express';
import {RegistrationGuard} from './guards/registration.guard';
import {LoginUserDto} from './dto/login-user.dto';
import {LoginGuard} from './guards/login.guard';
import {AuthService} from './auth.service';
import {JWTRefreshGuard} from './guards/jwt-refresh.guard';
import {RefreshTokenDto} from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @UseGuards(LoginGuard)
    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        const user = await this.usersService.login(loginUserDto);

        if (user) {
            const accessToken = this.authService.generateAccessToken(user);
            const refreshToken = this.authService.generateRefreshToken(user._id as string);

            res.statusCode = HttpStatus.OK;

            return res.send({
                ...accessToken,
                ...refreshToken,
                username: user.username,
                id: user._id,
            });
        }
    }

    @UseGuards(RegistrationGuard)
    @Post('registration')
    async registrationUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.usersService.registration(createUserDto);

        res.statusCode = HttpStatus.CREATED;
        return res.send('user created');
    }

    @UseGuards(JWTRefreshGuard)
    @Post('refresh')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) {
        const validToken = this.authService.verifyToken(refreshTokenDto.refresh_token);

        // if (validToken) {
        //     return res.status(HttpStatus.OK).send(refreshTokenDto);
        // }

        const user = await this.usersService.findOneById(refreshTokenDto.id);

        // if (validToken && user) {
        //     return res.status(HttpStatus.OK).send(`${user} ${validToken.username}`);
        // }

        if (user) {
            const accessToken = this.authService.generateAccessToken(user);

            if (user && validToken?.error) {
                if (validToken.error === 'jwt expired') {
                    const refreshToken = this.authService.generateRefreshToken(user._id as string);
                    res.statusCode = HttpStatus.OK;

                    return res.send({...refreshToken, ...accessToken});
                } else {
                    res.statusCode = HttpStatus.BAD_REQUEST;
                    return res.send({error: validToken.error});
                }
            } else {
                res.statusCode = HttpStatus.OK;

                return res.send({
                    ...accessToken,
                    refresh_token: refreshTokenDto.refresh_token,
                });
            }
        }
    }
}
