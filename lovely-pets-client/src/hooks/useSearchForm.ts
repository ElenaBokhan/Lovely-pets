import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {SEARCH_PARAMS_KEY} from 'Components/SearchForm/SearchForm';
import {useDebounce} from 'hooks/useDebounce';
import {petsListFilterStore} from 'Store/petsListFilterStore';

export const useSearchForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [localSearchValue, setLocalSearchValue] = useState(() => {
        return searchParams.get(SEARCH_PARAMS_KEY) || '';
    });

    const debouncedValue = useDebounce({value: localSearchValue, delay: 1e3});

    useEffect(() => {
        petsListFilterStore.setState((state) => ({...state, search: debouncedValue}));
    }, [debouncedValue]);

    useEffect(() => {
        if (localSearchValue) {
            searchParams.set(SEARCH_PARAMS_KEY, localSearchValue);
        } else {
            searchParams.delete(SEARCH_PARAMS_KEY);
        }
        setSearchParams(searchParams);
    }, [localSearchValue, searchParams, setSearchParams]);

    return [localSearchValue, setLocalSearchValue] as const;
};
