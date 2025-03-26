import styles from 'Pages/Cart/Cart.module.css';
import {NotFound} from 'Components/Common/NotFound/NotFound';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {CartProduct} from './CartProduct';
import {Breadcrumbs} from 'Components/Common/Breadcrumbs/Breadcrumbs';
import {DeliveryPlaceholder} from 'Components/Placeholders/Delivery';
import {CartMenu} from 'Pages/Cart/CartMenu';
import {useStore} from '@tanstack/react-store';
import {cartStore} from 'Store/cartStore';
import {withProtection} from 'HOCs/withProtection';

export const Cart = withProtection(() => {
    const {cart, cartCount} = useStore(cartStore, (state) => ({
        cart: state,
        cartCount: Object.keys(state).length,
    }));

    const cartSizeText = () => {
        const text = (
            <span>
                <b>{cartCount} товара</b> в корзине
            </span>
        );

        return (
            <Text type={ETextType.H1} weight={EFontWeight.SECONDARY}>
                {text}
            </Text>
        );
    };

    const renderProducts = () => {
        return (
            <div className={styles.cartProducts}>
                {Object.values(cart).map(({pet, count}, index) => (
                    <>
                        <CartProduct key={pet._id} pet={pet} count={count} />
                        {index !== cartCount - 1 && <hr />}
                    </>
                ))}
            </div>
        );
    };

    const renderCartMenu = () => {
        return (
            <div className={styles.cartMenuContainer}>
                <CartMenu />
                <DeliveryPlaceholder />
            </div>
        );
    };

    return (
        <>
            <Breadcrumbs />
            {cartCount === 0 ? (
                <NotFound />
            ) : (
                <>
                    {cartSizeText()}
                    <div className={styles.cartConteiner}>
                        {renderProducts()}
                        {renderCartMenu()}
                    </div>
                </>
            )}
        </>
    );
});
