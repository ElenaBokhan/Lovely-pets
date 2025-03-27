import {IsNotEmpty} from 'class-validator';
import {ESortFilter} from '../../Enum';

export class PetsListFilterDto {
    @IsNotEmpty()
    readonly search: string;
    @IsNotEmpty()
    readonly sortingType: ESortFilter;
    @IsNotEmpty()
    readonly pagination: number;
}
