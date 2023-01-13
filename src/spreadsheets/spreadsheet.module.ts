import { Module } from '@nestjs/common';
import { SpreadsheetsController } from './spreadsheets.controller';
import { SpreadsheetService } from './spreadsheet.service';
import { MongoRepository } from 'typeorm';
import { Spreadsheet } from './entities/spreadsheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Spreadsheet])],
  controllers: [SpreadsheetsController],
  providers: [SpreadsheetService],
  exports: [SpreadsheetService],
})
export class SpreadsheetModule {}
