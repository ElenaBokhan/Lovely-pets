import {Store} from '@tanstack/react-store';
import {getUndiscountedPrice} from 'Utils/utils';

export interface ICartMap {
    [petId: string]: ICartPet;
}

export interface ICartPet {
    pet: IPet;
    count: number;
}

export const cartStore = new Store<ICartMap>({});

export const addToCart = (pet: IPet, count = 1) => {
    cartStore.setState((state) => {
        const {_id: petId} = pet;

        return {
            ...state,
            [petId]: {pet, count},
        };
    });
};

export const incrementCount = (petId: string) => {
    cartStore.setState((state) => {
        return {
            ...state,
            [petId]: {...state[petId], count: state[petId].count + 1},
        };
    });
};

export const decrementCount = (petId: string) => {
    cartStore.setState((state) => {
        return {
            ...state,
            [petId]: {...state[petId], count: state[petId].count - 1},
        };
    });
};

export const removeFromCart = (petId: string) => {
    cartStore.setState((state) => {
        const currentState = {...state};
        delete currentState[petId];

        return currentState;
    });
};

export const selectCartCost = (state: ICartMap) => {
    const values = Object.values(state);

    return {
        total: values.reduce((acc, {pet, count}) => (acc += pet.price * count), 0),
        undiscountedPrice: values.reduce(
            (acc, {pet: {price, discount}, count}) => (acc += getUndiscountedPrice(price, discount) * count),
            0
        ),
        cartCount: values.length,
    };
};

export const setCartFromStorage = () => {
    const cart = localStorage.getItem('cart');

    if (cart) {
        cartStore.setState(() => JSON.parse(cart));
    }
};

export const setCartToStorage = () => {
    const cart = cartStore.state;
    localStorage.setItem('cart', JSON.stringify(cart));
};
