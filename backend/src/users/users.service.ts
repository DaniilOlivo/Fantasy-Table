import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema'

type FindedUser = Promise<UserDocument|null>

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  findOne(id: string): FindedUser {
    return this.userModel.findById(id);
  }

  findByUsername(username: string): FindedUser {
    return this.userModel.findOne({username});
  }

  update(id: string, updateUserDto: UpdateUserDto): FindedUser {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  remove(id: string): FindedUser {
    return this.userModel.findByIdAndDelete(id);
  }
}
