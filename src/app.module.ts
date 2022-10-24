import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      authSource: process.env.NODE_ENV === 'development' ? 'admin' : undefined,
      database: process.env.MONGODB_DATABASE,
      url: process.env.MONGODB_CONNECTION_STRING,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
