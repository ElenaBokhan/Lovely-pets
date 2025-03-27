import {IsNotEmpty} from 'class-validator';

export class AddReviewPetDto {
    @IsNotEmpty()
    readonly rating: number;

    @IsNotEmpty()
    readonly text: string;

    @IsNotEmpty()
    readonly userName: string;

    @IsNotEmpty()
    readonly petId: string;

    @IsNotEmpty()
    readonly userId: string;
}
