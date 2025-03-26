import instance from 'Api/axiosClient';
import {AxiosResponse} from 'axios';

export class PetsClient {
    static async getPetsList(filter: IPetsListFilter) {
        try {
            const result: AxiosResponse<IPet[]> = await instance.post('pets', filter);
            return result.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getFavouritesList(userId: string) {
        try {
            const result: AxiosResponse<IPet[]> = await instance.post('pets/favourites', {userId});
            return result.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getPet(id: string) {
        try {
            const result: AxiosResponse<IPet> = await instance.get(`pets/${id}`);
            return result.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createPet(data: INewProduct) {
        try {
            const result: AxiosResponse<IPet> = await instance.post('pets/create', {...data});
            return result.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async removePet(id: string) {
        try {
            await instance.delete(`pets/${id}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async addToFavourite(data: IAddToFavourite) {
        try {
            await instance.post('pets/add-to-favourite', {...data});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async removeFromFavourite(data: IAddToFavourite) {
        try {
            await instance.post('pets/remove-from-favourite', {...data});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async toggleFavourite(data: IAddToFavourite) {
        try {
            const {isFavourite, userId, petId} = data;
            await instance.post(isFavourite ? 'pets/remove-from-favourite' : 'pets/add-to-favourite', {userId, petId});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async addReview(data: IAddReviewRequest): Promise<IPet> {
        try {
            const response = await instance.post('pets/add-review', {...data});

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
