import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UsersDocument} from 'src/schemas/users.schemas';
import {Model} from 'mongoose';
import {CreateUserDto} from 'src/auth/dto/create-user.dto';
import {LoginUserDto} from 'src/auth/dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModel: Model<UsersDocument>) {}

    async login(loginUserDto: LoginUserDto): Promise<User | null> {
        const user = await this.usersModel.collection.findOne({
            email: loginUserDto.email,
        });

        if (!user) {
            return null;
        }

        return user as User;
    }

    async registration(createUserDto: CreateUserDto): Promise<User | null> {
        const existingUser = await this.usersModel.collection.findOne({
            email: createUserDto.email,
        });

        if (existingUser) {
            return null;
        }

        const createdUser = new this.usersModel(createUserDto);
        return createdUser.save();
    }

    async findOne(email: string): Promise<User | null> {
        return this.usersModel.findOne({email});
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersModel.findOne({_id: id});
    }
}
