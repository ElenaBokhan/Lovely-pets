import {Body, Controller, HttpStatus, Post, Get, Res, UseGuards, HttpCode, Patch, Param, Delete} from '@nestjs/common';
import {Response} from 'express';
import {AuthService} from 'src/auth/auth.service';
import {JWTGuard} from 'src/auth/guards/jwt.guard';
import {PetsService} from './pets.service';
import {CreatPetDto} from './dto/create-pet.dto';
import {UpdatePetDto} from './dto/update-pet.dto';
import {PetsListFilterDto} from './dto/pets-list-filter.dto';
import {FavouriteDto} from './dto/add-to-favourite.dto';
import {AddReviewPetDto} from './dto/add-review-pet.dto';
import {FavouritesListDto} from './dto/favourites-list.dto';

@Controller('pets')
export class PetController {
    constructor(
        private petsService: PetsService,
        private authService: AuthService
    ) {}

    @UseGuards(JWTGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async getAllPets(@Body() filter: PetsListFilterDto, @Res() res: Response) {
        const pets = await this.petsService.findAll(filter);

        return res.send(pets);
    }

    @UseGuards(JWTGuard)
    @Post('favourites')
    @HttpCode(HttpStatus.OK)
    async getFavouritesPets(@Body() {userId}: FavouritesListDto, @Res() res: Response) {
        const pets = await this.petsService.findFavourites(userId);

        return res.send(pets);
    }

    @UseGuards(JWTGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getPet(@Param('id') id: string, @Res() res: Response) {
        const pet = await this.petsService.findOne(id);

        return res.send(pet);
    }

    @UseGuards(JWTGuard)
    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createPet(@Body() createPetDto: CreatPetDto) {
        return await this.petsService.create(createPetDto);
    }

    @UseGuards(JWTGuard)
    @Patch(':id/update')
    @HttpCode(HttpStatus.OK)
    async updatePet(@Body() updatePetDto: UpdatePetDto, @Param('id') id: string) {
        return await this.petsService.update(updatePetDto, id);
    }

    @UseGuards(JWTGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deletePet(@Param('id') id: string) {
        return await this.petsService.delete(id);
    }

    @UseGuards(JWTGuard)
    @Post('add-to-favourite')
    @HttpCode(HttpStatus.OK)
    async addToFavourite(@Body() addToFavouriteDto: FavouriteDto) {
        return await this.petsService.addToFavourite(addToFavouriteDto);
    }

    @UseGuards(JWTGuard)
    @Post('remove-from-favourite')
    @HttpCode(HttpStatus.OK)
    async removeFromFavourite(@Body() removeFromFavourite: FavouriteDto) {
        return await this.petsService.removeFromFavourite(removeFromFavourite);
    }

    @UseGuards(JWTGuard)
    @Post('add-review')
    @HttpCode(HttpStatus.OK)
    async addReview(@Body() addReviewPetDto: AddReviewPetDto, @Res() res: Response) {
        const pet = await this.petsService.addReview(addReviewPetDto);
        return res.send(pet);
    }
}
