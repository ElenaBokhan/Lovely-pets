import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from 'src/auth/auth.module';
import {PetController} from './pets.controller';
import {PetsService} from './pets.service';
import {Pet, PetsSchema} from '../schemas/pets.schemas';

@Module({
    imports: [MongooseModule.forFeature([{name: Pet.name, schema: PetsSchema}]), AuthModule],
    providers: [PetsService],
    controllers: [PetController],
})
export class PetsModule {}
