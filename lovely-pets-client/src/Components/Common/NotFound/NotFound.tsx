import searchNotFound from 'assets/ic-notfound.svg';
import {LinkButton} from 'Components/Common/LinkButton/LinkButton';
import styles from 'Components/Common/NotFound/NotFound.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {ETestId} from 'Enum';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

enum ENotFoundPlacement {
    CART = 'CART',
    CATALOG = 'CATALOG',
    FAVOURITES = 'FAVOURITES',
}
export const NotFound = () => {
    const state = useLocation();
    const {t} = useTranslation();

    const notFoundConfig = {
        [ENotFoundPlacement.CATALOG]: {
            title: 'Простите, по вашему запросу товаров не найдено.',
            subtitle: '',
        },
        [ENotFoundPlacement.FAVOURITES]: {
            title: t('not_found.favourites.title'),
            subtitle: t('not_found.favourites.subtitle'),
        },
        [ENotFoundPlacement.CART]: {
            title: t('not_found.cart.title'),
            subtitle: t('not_found.cart.subtitle'),
        },
    };

    const renderTitle = () => {
        const placement =
            state.pathname === '/cart'
                ? ENotFoundPlacement.CART
                : state.pathname === '/'
                ? ENotFoundPlacement.CATALOG
                : ENotFoundPlacement.FAVOURITES;
        const {title, subtitle} = notFoundConfig[placement];

        return (
            <>
                <Text type={ETextType.P1} value={title} weight={EFontWeight.GENERAL} />
                {subtitle && (
                    <Text className={placement === ENotFoundPlacement.FAVOURITES && styles.heart} value={subtitle} />
                )}
            </>
        );
    };

    return (
        <div data-testid={ETestId.NOT_FOUND} className={styles.notFound}>
            <img alt="searchNotFound" src={searchNotFound} />
            {renderTitle()}
            <LinkButton label={t('not_found.button')} path={'/'} />
        </div>
    );
};
