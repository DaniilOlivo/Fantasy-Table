import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Game } from 'src/games/schemas/game.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop([{type: Types.ObjectId, ref: 'Game'}])
    games: Game[];
}

export const UserSchema = SchemaFactory.createForClass(User);
