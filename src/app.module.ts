import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SpreadsheetModule } from './spreadsheets/spreadsheet.module';
import { SpreadsheetRowModule } from './spreadsheets_rows/spreadsheet_row.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      authSource: 'admin',
      database: process.env.MONGO_INITDB_DATABASE,
      url: process.env.CONNECTION_STRING,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    SpreadsheetModule,
    SpreadsheetRowModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
