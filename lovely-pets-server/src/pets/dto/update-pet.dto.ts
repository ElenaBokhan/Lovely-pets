import {IsNotEmpty, IsOptional} from 'class-validator';

export class UpdatePetDto {
    @IsNotEmpty()
    readonly available: boolean;

    @IsNotEmpty()
    readonly author: string; // think about model

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    readonly discount: number;

    @IsNotEmpty()
    readonly pictures: string;

    @IsNotEmpty()
    readonly wight: string;
}
