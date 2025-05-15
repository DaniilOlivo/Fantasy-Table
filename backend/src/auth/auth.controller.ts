import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/common/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signin')
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto);
    }

    @Public()
    @Post('signup')
    signUp(@Body() dataNewUser: CreateUserDto) {
        return this.authService.signUp(dataNewUser);
    }
}
