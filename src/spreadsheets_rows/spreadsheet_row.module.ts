import { Module } from '@nestjs/common';
import { SpreadsheetRowController } from './spreadsheet_row.controller';
import { SpreadsheetRowService } from './spreadsheet_row.service';
import { SpreadsheetRows } from './entities/spreadsheet_row.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([SpreadsheetRows])],
  controllers: [SpreadsheetRowController],
  providers: [SpreadsheetRowService],
  exports: [SpreadsheetRowService],
})
export class SpreadsheetRowModule {}
