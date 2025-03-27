import {IsNotEmpty} from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty()
    readonly refresh_token: string;

    @IsNotEmpty()
    readonly id: string;
}
