import styles from 'Pages/Cart/Cart.module.css';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Link} from 'react-router-dom';
import {ButtonCounter} from 'Components/Common/ButtonCounter/ButtonCounter';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import trashIcon from 'assets/ic-trash.svg';
import {Price} from 'Components/Common/Price/Price';
import {decrementCount, ICartPet, incrementCount, removeFromCart} from 'Store/cartStore';

export const CartProduct = ({pet, count}: ICartPet) => {
    const {name, price, discount, stock, _id, description, pictures, wight} = pet;

    const handleIncrease = () => {
        incrementCount(_id);
    };

    const handleDecrease = () => {
        count !== 1 ? decrementCount(_id) : removeFromCart(_id);
    };

    const handleRemoveProductFromCart = () => {
        removeFromCart(_id);
    };

    return (
        <div className={styles.cartProduct}>
            <Link className={styles.cartProductLink} to={`/${_id}`}>
                <div className={styles.productImg}>
                    <img alt={description} height={'62px'} src={pictures} />
                </div>
                <div className={styles.productName}>
                    <Text type={ETextType.P2} weight={EFontWeight.GENERAL} value={name} />
                    <Text type={ETextType.S1} fontColor={EFontColor.GREY} value={`${wight} кг`} />
                </div>
            </Link>
            <ButtonCounter onDecrease={handleDecrease} onIncrease={handleIncrease} count={count} max={stock} />
            <IconButton alt="trashIcon" icon={trashIcon} onClick={handleRemoveProductFromCart} />
            <Price className={styles.cartPrice} discount={discount} price={price * count} />
        </div>
    );
};
