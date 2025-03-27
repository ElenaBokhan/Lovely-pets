import {IsNotEmpty} from 'class-validator';

export class FavouriteDto {
    @IsNotEmpty()
    readonly petId: string;

    @IsNotEmpty()
    readonly userId: string;
}
