import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { JwtGuard } from './common/jwt.guard';
import config from './config/configuration';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),

        // Dynamic async get uri database
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('database_uri'),
                authSource: 'admin',
            }),
            inject: [ConfigService],
        }),

        UsersModule,

        AuthModule,

        GamesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,

        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },

        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
