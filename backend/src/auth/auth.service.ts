import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'; 
import { UserDocument } from 'src/users/schemas/users.schema';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

type TokenObject = {
  access_token: string,
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDocument> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('User does not exist');
    if (!await bcrypt.compare(pass, user.password)) throw new UnauthorizedException('Incorrect login or password');
    return user
  }

  async getToken(user: UserDocument): Promise<TokenObject> {
    const payload = { sub: user.id, username: user.username};
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async hashPass(pass: string) {
    const rounds = this.configService.get<number>('bcrypt.rounds')!;
    return await bcrypt.hash(pass, rounds);
  }

  async signUp(data: CreateUserDto): Promise<TokenObject> {
    if (await this.usersService.findByUsername(data.username)) throw new BadRequestException('User does not exist');
    const hash = await this.hashPass(data.password);
    const newUser = await this.usersService.create({...data, password: hash});
    return this.getToken(newUser);
  }

  async signIn(data: AuthDto): Promise<TokenObject> {
    const user = await this.validateUser(data.username, data.password);
    return this.getToken(user);
  }
}
