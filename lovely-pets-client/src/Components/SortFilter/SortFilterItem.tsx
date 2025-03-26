import cn from 'classnames';
import styles from 'Components/SortFilter/SortFilter.module.css';
import React from 'react';
import {ESortFilter} from 'Enum';

interface ISortFilterItemProps {
    isSelected: boolean;
    label: string;
    onChangeFilter: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    value: keyof typeof ESortFilter;
}

export const SortFilterItem = ({isSelected, label, onChangeFilter, value}: ISortFilterItemProps) => (
    <button
        className={cn(styles.filterItem, isSelected && styles.selected)}
        data-value={value}
        onClick={onChangeFilter}
    >
        {label}
    </button>
);
