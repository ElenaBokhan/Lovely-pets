import {IsNotEmpty, IsOptional} from 'class-validator';

export interface ReviewPet {
    createdAt: Date;
    rating: number;
    text: string;
    username: string;
    userId: string;
}

export class CreatPetDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    readonly discount: number;

    @IsOptional()
    readonly likes: string[] = [];

    @IsNotEmpty()
    readonly pictures: string;

    @IsOptional()
    readonly reviews: ReviewPet[] = [];

    @IsNotEmpty()
    readonly stock: number;

    @IsNotEmpty()
    readonly wight: number;
}
