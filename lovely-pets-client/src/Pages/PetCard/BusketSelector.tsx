import {Button} from 'Components/Common/Button/Button';
import {ButtonCounter} from 'Components/Common/ButtonCounter/ButtonCounter';
import styles from 'Pages/PetCard/PetCard.module.css';
import {useState} from 'react';
import {addToCart, cartStore} from 'Store/cartStore';
import {useStore} from '@tanstack/react-store';

interface IBasketSelectorProps {
    stock: number;
    pet: IPet;
}

export const BusketSelector = ({stock, pet}: IBasketSelectorProps) => {
    const cart = useStore(cartStore, (state) => state);

    const [count, setCount] = useState<number>(cart[pet._id]?.count || 0);

    const handleIncrease = () => {
        setCount((prevState) => prevState + 1);
    };

    const handleDecrease = () => {
        setCount((prevState) => prevState - 1);
    };

    const handleClick = () => {
        !!stock && addToCart(pet, count);
    };

    return (
        <div className={styles.busketSelector}>
            <ButtonCounter max={stock} count={count} onDecrease={handleDecrease} onIncrease={handleIncrease} />
            <Button onChange={handleClick} label={'В корзину'} />
        </div>
    );
};
