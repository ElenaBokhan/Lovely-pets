import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Schema, SortOrder} from 'mongoose';
import {Pet, PetsDocument} from '../schemas/pets.schemas';
import {CreatPetDto, ReviewPet} from './dto/create-pet.dto';
import {UpdatePetDto} from './dto/update-pet.dto';
import {FavouriteDto} from './dto/add-to-favourite.dto';
import {PetsListFilterDto} from './dto/pets-list-filter.dto';
import {ESortFilter} from '../Enum';
import {AddReviewPetDto} from './dto/add-review-pet.dto';
import {FavouritesListDto} from './dto/favourites-list.dto';

@Injectable()
export class PetsService {
    constructor(@InjectModel(Pet.name) private petsModel: Model<PetsDocument>) {}

    async findOne(id: string): Promise<Pet | null> {
        return this.petsModel.findOne({_id: id});
    }

    async findAll({search, sortingType, pagination}: PetsListFilterDto): Promise<Pet[]> {
        const perPage = 9;
        const skipValue = (pagination - 1) * perPage;
        const regexp = new RegExp('.*' + search + '.*', 'gi');

        type TSortingTypeMap = {
            [key in keyof typeof ESortFilter]: {[key: string]: SortOrder};
        };

        const sortingTypeMap: TSortingTypeMap = {
            [ESortFilter.POPULAR]: {likes: -1},
            [ESortFilter.NEW]: {createdAt: -1},
            [ESortFilter.CHEAPER]: {price: 1},
            [ESortFilter.EXPENSIVE]: {price: -1},
            [ESortFilter.DISCOUNT]: {discount: -1},
            [ESortFilter.RATING]: {rating: -1},
        };

        return this.petsModel.find({name: regexp}).sort(sortingTypeMap[sortingType]).skip(skipValue).limit(perPage);
    }

    async findFavourites(userId: string): Promise<Pet[]> {
        return this.petsModel.find({likes: userId});
    }

    async create(createPetDto: CreatPetDto): Promise<Pet> {
        const createdCost = new this.petsModel({...createPetDto, createdAt: Date.now()});

        return createdCost.save();
    }

    async update(updatePetDto: UpdatePetDto, id: string): Promise<Pet | null> {
        await this.petsModel.updateOne({_id: id}, {$set: {...updatePetDto}});

        return this.findOne(id);
    }

    async delete(id: string): Promise<void> {
        await this.petsModel.deleteOne({_id: id});
    }

    async addToFavourite(addToFavouriteDto: FavouriteDto): Promise<void> {
        const pet = await this.findOne(addToFavouriteDto.petId);

        if (pet) {
            await this.petsModel.updateOne({_id: addToFavouriteDto.petId}, {$push: {likes: addToFavouriteDto.userId}});
        }
    }

    async removeFromFavourite(removeFromFavouriteDto: FavouriteDto): Promise<void> {
        const pet = await this.findOne(removeFromFavouriteDto.petId);

        if (pet) {
            await this.petsModel.updateOne(
                {_id: removeFromFavouriteDto.petId},
                {$pull: {likes: removeFromFavouriteDto.userId}}
            );
        }
    }

    async addReview(addReviewPetDto: AddReviewPetDto): Promise<Pet | null> {
        const {petId, ...reviewProps} = addReviewPetDto;

        const pet = await this.findOne(addReviewPetDto.petId);

        if (pet) {
            const updatedRating =
                (pet.reviews.reduce((acc, {rating}) => (acc += rating), 0) + reviewProps.rating) /
                (pet.reviews.length + 1);

            const updatedPet = await this.petsModel.findOneAndUpdate(
                {_id: addReviewPetDto.petId},
                {
                    $push: {reviews: {...reviewProps, createdAt: Date.now()}},
                    $set: {rating: updatedRating},
                },
                {returnOriginal: false}
            );

            return updatedPet;
        }

        return null;
    }
}
