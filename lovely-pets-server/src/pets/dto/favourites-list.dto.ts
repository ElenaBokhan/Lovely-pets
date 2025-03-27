import {IsNotEmpty} from 'class-validator';

export class FavouritesListDto {
    @IsNotEmpty()
    readonly userId: string;
}
