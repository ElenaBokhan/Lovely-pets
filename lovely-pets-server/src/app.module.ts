import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {MongooseConfigService} from './config/MongooseConfigService';
import configuration from './config/configuration';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {PetsModule} from './pets/pets.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongooseConfigService,
        }),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        UsersModule,
        AuthModule,
        PetsModule,
    ],
})
export class AppModule {}
