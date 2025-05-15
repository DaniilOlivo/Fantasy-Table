import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "Пароль должен содержать минимум 6 символов" })
    password: string;
}
