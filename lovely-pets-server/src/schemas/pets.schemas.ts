import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PetsDocument = Pet & Document;

@Schema()
export class Review {
    @Prop({required: false})
    createdAt: Date;

    @Prop({required: true})
    rating: number;

    @Prop({required: true})
    text: string;

    @Prop({required: true})
    userName: string;

    @Prop({required: true})
    userId: string;
}

@Schema()
export class Pet {
    @Prop({required: false})
    createdAt: Date;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    description: string;

    @Prop({required: false})
    discount: number;

    @Prop({required: false, default: []})
    likes: string[];

    @Prop({required: true})
    pictures: string;

    @Prop({required: true, default: 0})
    rating: number;

    @Prop({required: false, default: []})
    reviews: Review[];

    @Prop({required: true})
    stock: number;

    @Prop({required: true})
    wight: number;
}

export const PetsSchema = SchemaFactory.createForClass(Pet);
