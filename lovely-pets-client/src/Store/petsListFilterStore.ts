import {Store} from '@tanstack/react-store';
import {ESortFilter} from 'Enum';

export const petsListFilterStore = new Store<IPetsListFilter>({
    search: '',
    sortingType: ESortFilter.POPULAR,
    pagination: 1,
});
