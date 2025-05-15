import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsMongoId()
    user: Types.ObjectId;

    @IsOptional()
    @IsBoolean()
    gm?: boolean;

    @IsOptional()
    @IsString()
    color?: string;
}

export class CreateGameDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsMongoId()
    owner: Types.ObjectId;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlayerDto)
    players?: CreatePlayerDto[];
}
