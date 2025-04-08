import searchIcon from 'assets/ic-close-input.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import styles from 'Components/SearchForm/SearchForm.module.css';
import {ETestId} from 'Enum';
import {FormEvent} from 'react';
import {useSearchForm} from 'hooks/useSearchForm';
import {useTranslation} from 'react-i18next';

export const SEARCH_PARAMS_KEY = 'query';

export const SearchForm = () => {
    const [searchValue, setSearchValue] = useSearchForm();
    const {t} = useTranslation();

    const handleSubmit = (event: FormEvent) => {
        setSearchValue(searchValue);
        event.preventDefault();
    };

    const handleFilterChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const filterText = event.currentTarget.value;
        setSearchValue(filterText);
    };

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div className={styles.searchForm}>
            <form onSubmit={handleSubmit}>
                <input
                    data-test-id={ETestId.HEADER_SEARCH_INPUT}
                    onChange={handleFilterChange}
                    placeholder={t('pages.catalog.filter.search.placeholder')}
                    value={searchValue}
                />
            </form>
            <IconButton alt="searchButton" icon={searchIcon} onClick={handleClear} />
        </div>
    );
};
