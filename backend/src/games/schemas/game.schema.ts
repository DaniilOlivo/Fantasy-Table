import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Player {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ default: false })
    gm: Boolean;

    @Prop()
    color: String;
}

@Schema({ timestamps: true })
export class Game {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({ default: false })
    active: Boolean;

    @Prop()
    players: Player[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
