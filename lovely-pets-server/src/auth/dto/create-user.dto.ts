import {IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly password: string;
}
