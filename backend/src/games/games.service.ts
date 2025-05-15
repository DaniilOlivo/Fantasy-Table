import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    ) {}

    create(createGameDto: CreateGameDto) {
        const game = new this.gameModel(createGameDto);
        return game.save();
    }

    findAll() {
        return this.gameModel.find();
    }

    findOne(id: string) {
        return this.gameModel.findById(id);
    }

    update(id: string, updateGameDto: UpdateGameDto) {
        return this.gameModel.findByIdAndUpdate(id, updateGameDto);
    }

    remove(id: string) {
        return this.gameModel.findByIdAndDelete(id);
    }
}
