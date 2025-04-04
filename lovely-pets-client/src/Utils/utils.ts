import {PER_PAGE} from 'Const';
import {ESortFilter} from 'Enum';

export const calculateUndiscountedPrice = (price: number, discount: number) => {
    return Math.floor(price + (price * discount) / 100);
};

export const getUndiscountedPrice = (price: number, discount: number) => {
    return discount ? calculateUndiscountedPrice(price, discount) : price;
};

export const isPetFavourite = (likes: string[], id: string) => {
    return likes?.includes(id);
};

export const getDefaultFilter = (): IClientFilter => {
    return {search: '', page: 1, perPage: PER_PAGE};
};

export const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
});

export const objectHasProperty = <P extends PropertyKey>(obj: unknown, prop: P): obj is object & Record<P, unknown> => {
    return typeof obj === 'object' && !!obj && Object.hasOwn(obj, prop);
};

export const getResponse = (ms: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('success');
            } else {
                reject(new Error('error'));
            }
        }, ms);
    });
};

export const getSortingProducts = (productList: IPet[], sortFilter: ESortFilter): IPet[] => {
    const sortProducts: IPet[] = [...productList];

    switch (sortFilter) {
        case ESortFilter.POPULAR:
            break;
        case ESortFilter.NEW:
            break;
        case ESortFilter.CHEAPER:
            return sortProducts.sort((first, second) => first.price - second.price);
        case ESortFilter.EXPENSIVE:
            return sortProducts.sort((first, second) => second.price - first.price);
        case ESortFilter.DISCOUNT:
            return sortProducts.sort((first, second) => second.discount - first.discount);
        case ESortFilter.RATING:
            break;
    }

    return sortProducts;
};
