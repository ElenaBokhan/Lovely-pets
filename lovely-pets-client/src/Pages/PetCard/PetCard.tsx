import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import searchIcon from 'assets/ic-search.svg';
import trashIcon from 'assets/ic-trash.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {LinkButton} from 'Components/Common/LinkButton/LinkButton';
import {Price} from 'Components/Common/Price/Price';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {DeliveryPlaceholder} from 'Components/Placeholders/Delivery';
import {QualityPlaceholder} from 'Components/Placeholders/Quality';
import {ProductPopup} from 'Components/ProductPopup/ProductPopup';
import {Review} from 'Components/Review/Review';
import {ETestId} from 'Enum';
import {BusketSelector} from 'Pages/PetCard/BusketSelector';
import styles from 'Pages/PetCard/PetCard.module.css';
import {useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDeletePetMutation, useGetPet, useTogglePetFavouriteMutation} from 'Api/queryHooks';
import {isPetFavourite} from 'Utils/utils';

export const PetCard = () => {
    const {state} = useLocation();
    const {petId} = useParams();
    const userId = localStorage.getItem('userId');

    const {data} = useGetPet(petId);
    const {name, price, discount, description, likes, pictures, reviews, stock, _id} = data || {};

    const {mutate: toggleFavourite} = useTogglePetFavouriteMutation();
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const {mutate: deletePet} = useDeletePetMutation();
    const navigate = useNavigate();

    const isFavourite: boolean = isPetFavourite(likes, userId);

    const handleTogglePopup = () => {
        setOpenPopup(!openPopup);
    };

    const handleToggleProductToFavourites = () => {
        const data: IAddToFavourite = {userId, petId, isFavourite};
        toggleFavourite(data);
    };

    const handleDeleteProduct = () => {
        deletePet(_id);
        navigate('/');
    };

    const renderAddToFavouriteButton = () => {
        const labelButton = isFavourite ? 'Удалить из избранного' : 'В избранное';

        return (
            <button
                data-testid={!isFavourite ? ETestId.ADD_TO_FAVOURITES : ETestId.REMOVE_FROM_FAVOURITES}
                className={styles.toFavourites}
                onClick={handleToggleProductToFavourites}
            >
                <img alt="favourites" src={isFavourite ? favouritesFillIcon : favouritesIcon} />
                <Text fontColor={EFontColor.GREY} type={ETextType.P2} value={labelButton} />
            </button>
        );
    };

    const renderDeleteButton = () => {
        return (
            <button
                data-testid={ETestId.PRODUCT_TRASH_BUTTON}
                className={styles.toFavourites}
                onClick={handleDeleteProduct}
            >
                <img alt="deleteIcon" src={trashIcon} />
                <Text fontColor={EFontColor.GREY} type={ETextType.P2} value={'Удалить товар'} />
            </button>
        );
    };

    const renderProductMain = () => (
        <div className={styles.productMain}>
            <div className={styles.productImage}>
                {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
                <img alt={description} className={styles.pictures} src={pictures} width={'488px'} />
                <IconButton
                    onClick={handleTogglePopup}
                    className={styles.searchIcon}
                    alt={'searchIcon'}
                    icon={searchIcon}
                />
            </div>
            <div className={styles.productMainInfo}>
                <Price price={price} discount={discount} />
                <BusketSelector stock={stock} pet={data} />
                {renderAddToFavouriteButton()}
                <DeliveryPlaceholder />
                <QualityPlaceholder />
                {renderDeleteButton()}
            </div>
        </div>
    );

    const renderDescription = () => (
        <>
            <Text type={ETextType.H3} value={'Описание'} />
            <Text value={description} />
        </>
    );

    const renderReviews = () => (
        <>
            <Text type={ETextType.H3} value={'Отзывы'} />
            <LinkButton path="/addReview" label={'Написать отзыв'} state={data} />
            {reviews.map((review) => (
                <Review key={review.createdAt} review={review} />
            ))}
        </>
    );

    return (
        <div className={styles.productCard}>
            {data && (
                <>
                    <TitlePage label={name} pathName={state?.pathname} />
                    {renderProductMain()}
                    {renderDescription()}
                    {renderReviews()}
                    {openPopup && <ProductPopup onClose={handleTogglePopup} pictures={pictures} name={name} />}
                </>
            )}
        </div>
    );
};
