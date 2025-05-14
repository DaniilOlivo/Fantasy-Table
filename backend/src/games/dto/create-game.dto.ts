import { Types } from "mongoose";

export class CreatePlayerDto {
    user: Types.ObjectId;
    gm?: boolean;
    color?: string;
}

export class CreateGameDto {
    title: string;
    owner: Types.ObjectId;
    active?: boolean;
    players?: CreatePlayerDto[];
}
