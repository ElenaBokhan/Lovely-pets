import styles from 'Pages/Cart/Cart.module.css';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Button} from 'Components/Common/Button/Button';
import {useStore} from '@tanstack/react-store';
import {cartStore, selectCartCost} from 'Store/cartStore';

export const CartMenu = () => {
    const {total, undiscountedPrice, cartCount} = useStore(cartStore, selectCartCost);
    const discount = undiscountedPrice - total;

    return (
        <div className={styles.cartMenu}>
            <Text type={ETextType.H3} value={'Ваша корзина'} />
            <div className={styles.cartMenuLine}>
                <Text type={ETextType.P2} value={`Товары (${cartCount})`} />
                <Text type={ETextType.P2} value={undiscountedPrice + ' \u20BD'} />
            </div>
            {!!discount && (
                <div className={styles.cartMenuLine}>
                    <Text type={ETextType.P2} value={'Скидка'} />
                    <Text fontColor={EFontColor.RED} type={ETextType.P2} value={`-${discount} \u20BD`} />
                </div>
            )}
            <hr />
            <div className={styles.cartMenuLine}>
                <Text type={ETextType.P2} weight={EFontWeight.GENERAL} value={'Общая стоимость'} />
                <Text type={ETextType.H2} weight={EFontWeight.GENERAL} value={total + ' \u20BD'} />
            </div>
            <Button label={'Оформить заказ'} />
        </div>
    );
};
