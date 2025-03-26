import {NotFound} from 'Components/Common/NotFound/NotFound';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {PetsList} from 'Components/PetsList/PetsList';
import {SortFilter} from 'Components/SortFilter/SortFilter';
import {withProtection} from 'HOCs/withProtection';
import styles from 'Pages/Catalog/Catalog.module.css';
import {useGetPetsList} from 'Api/queryHooks';
import {petsListFilterStore} from 'Store/petsListFilterStore';
import {useStore} from '@tanstack/react-store';
import 'Translations/i18next';
import {useTranslation} from 'react-i18next';
import {LoadMore} from 'Components/Common/LoadMore/LoadMore';

// const isGetListByPaginate = false;

export const Catalog = withProtection(() => {
    const {t} = useTranslation();

    const filter = useStore(petsListFilterStore);
    const {data, hasNextPage, fetchNextPage, isFetching} = useGetPetsList(filter);

    const searchResultText = () => {
        const [petsData] = data.pages;

        return (
            <div className={styles.searchResultText}>
                <Text type={ETextType.H1} weight={EFontWeight.SECONDARY}>
                    <p>
                        {petsData.length === 0
                            ? t('pages.catalog.filter.search.not_found')
                            : t('pages.catalog.filter.search.result_text', {count: petsData.length})}
                    </p>
                </Text>
            </div>
        );
    };

    const showNotFound = filter.search && data?.pages?.length === 0 && !isFetching;
    const showSearchResultText = filter.search && !isFetching;

    return (
        <>
            {showSearchResultText && searchResultText()}
            <SortFilter />
            {showNotFound && <NotFound />}
            <div>{!!data && data.pages.map((page, index) => <PetsList key={index} pets={page} />)}</div>
            {!isFetching && <LoadMore action={fetchNextPage} hasNextPage={hasNextPage} />}
        </>
    );
});
