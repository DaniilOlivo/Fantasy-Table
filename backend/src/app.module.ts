import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config, ],
      isGlobal: true,
    }),

    // Dynamic async get uri database
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database_uri"),
        authSource: 'admin',
      }),
      inject: [ConfigService, ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
