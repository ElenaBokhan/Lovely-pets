import styles from 'Components/SortFilter/SortFilter.module.css';
import {SortFilterItem} from 'Components/SortFilter/SortFilterItem';
import React, {useCallback} from 'react';
import {petsListFilterStore} from 'Store/petsListFilterStore';
import {ESortFilter} from 'Enum';
import {useTranslation} from 'react-i18next';

const filters = Object.keys(ESortFilter) as (keyof typeof ESortFilter)[];

export const SortFilter = () => {
    const {t} = useTranslation();
    const {sortingType} = petsListFilterStore.state;

    const handleChangeSort = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
        const currentFilter = event.currentTarget.dataset.value;

        petsListFilterStore.setState((prev) => ({...prev, sortingType: currentFilter}));
    }, []);

    return (
        <div className={styles.filterPanel}>
            {filters.map((filter) => {
                const label = ESortFilter[filter].toLowerCase();

                return (
                    <SortFilterItem
                        isSelected={filter === sortingType}
                        key={filter}
                        label={t(`pages.catalog.filter.sort.${label}`)}
                        onChangeFilter={handleChangeSort}
                        value={filter}
                    />
                );
            })}
        </div>
    );
};
