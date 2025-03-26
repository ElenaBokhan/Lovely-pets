export {};

declare global {
    interface IClientFilter {
        search: string;
        page: number;
        perPage: number;
    }

    interface IPetsListFilter {
        search: string;
        sortingType: ESortFilter;
        pagination: number;
    }

    interface IPetsList {
        products: IPet[];
        total: number;
    }

    interface IAddToFavourite {
        isFavourite: boolean;
        petId: string;
        userId: string;
    }

    interface INewProduct {
        name: string;
        price: number;
        discount: number;
        wight: string;
        description: string;
        stock: number;
        pictures: string;
    }

    interface IReview {
        createdAt: string;
        text: string;
        rating: number;
        userId: string;
        userName: string;
    }

    interface IAddReviewRequest {
        text: string;
        rating: number;
        petId: string;
        userId: string;
        userName: string;
    }

    interface IUser {
        name: string;
        about: string;
        avatar: string;
        _id: string;
        email: string;
        __v?: number;
        group?: string;
    }

    type PostLikeParam = {
        _id: string;
        likes: string[];
    };

    export interface IPet {
        createdAt: string;
        name: string;
        price: number;
        discount: number;
        wight: string;
        description: string;
        likes?: string[];
        stock?: number;
        pictures: string;
        reviews?: IReview[];
        __v?: number;
        _id?: string;
    }

    interface IError {
        statusCode: number;
        message: string;
    }
}
