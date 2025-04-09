import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import trashIcon from 'assets/ic-trash.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Gap} from 'Components/Common/Gap/Gap';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {Price} from 'Components/Common/Price/Price';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/PetItem/PetItem.module.css';
import {ETestId} from 'Enum';
import {Link, useLocation} from 'react-router-dom';
import {isPetFavourite} from 'Utils/utils';
import {useToggleListFavouriteMutation} from 'Api/queryHooks';
import {useTranslation} from 'react-i18next';
import {addToCart} from '../../Store/cartStore';

interface IPetProps {
    pet: IPet;
}

export const PetItem = ({pet}: IPetProps) => {
    const {name, price, discount, wight, description, likes, pictures, _id, stock} = pet;

    const state = useLocation();
    const userId = localStorage.getItem('userId');

    const {mutate: toggleFavourite} = useToggleListFavouriteMutation();
    const {t} = useTranslation();

    const isCatalogPage = () => state?.pathname === '/';
    const isLiked = isPetFavourite(likes, userId);

    const handleToggleLikeProduct = () => {
        toggleFavourite({petId: _id, isFavourite: isLiked, userId});
    };

    const handleAddProductToCart = () => {
        !!stock && addToCart(pet);
    };

    const getIconProductItem = () => {
        const {alt, icon, onClick, testId} = isCatalogPage()
            ? {
                  testId: ETestId.PRODUCT_LIKE_BUTTON,
                  alt: isLiked ? 'likedIcon' : 'notLikedIcon',
                  icon: isLiked ? favouritesFillIcon : favouritesIcon,
                  onClick: handleToggleLikeProduct,
              }
            : {
                  testId: ETestId.PRODUCT_TRASH_BUTTON,
                  alt: 'trashIcon',
                  icon: trashIcon,
                  onClick: handleToggleLikeProduct,
              };
        return <IconButton alt={alt} className={styles.favourites} icon={icon} onClick={onClick} testId={testId} />;
    };

    const renderTextContent = () => (
        <div className={styles.textContent}>
            <div className={styles.name}>
                <Text testId={ETestId.PRODUCT_NAME} value={name} />
                <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={`${wight} кг`} />
            </div>
            <Gap size={6} />
            <Price price={price} discount={discount} />
        </div>
    );

    return (
        <div className={styles.productItem}>
            {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
            {getIconProductItem()}

            <Link data-testid={ETestId.PRODUCT_IMAGE} state={state} to={`/pets/${_id}`}>
                <img alt={description} className={styles.pictures} height={'187px'} src={pictures} width={'236px'} />
            </Link>
            {renderTextContent()}
            <Button
                className={styles.cartButton}
                onChange={handleAddProductToCart}
                label={t('button.cart')}
                theme={EButtonTheme.STANDARD}
            />
        </div>
    );
};
