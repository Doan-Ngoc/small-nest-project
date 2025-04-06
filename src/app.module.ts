import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { User } from './users/entities/user.entity';

const envFilePath = path.join(__dirname, `../src/configs/.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, `../src/configs/.env`),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        database: configService.get('POSTGRES_DB'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
