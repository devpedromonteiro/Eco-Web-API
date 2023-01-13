import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SpreadsheetRows } from './entities/spreadsheet_row.entity';

@Injectable()
export class SpreadsheetRowService {
  constructor(
    @InjectRepository(SpreadsheetRows)
    private readonly spreadsheetRowRepository: MongoRepository<SpreadsheetRows>,
  ) {}

  async findAllBySpreadsheetId(
    spreadsheet_id: string,
    page: number,
    limit: number,
  ) {
    const spreadheet_rows = await this.spreadsheetRowRepository.find({
      where: { spreadsheet_id },
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log(spreadheet_rows);
    return spreadheet_rows;
  }

  async countBySpreadsheetId(spreadsheet_id: string) {
    const count = await this.spreadsheetRowRepository.countBy({
      spreadsheet_id,
    });
    console.log(count);
    return count;
  }
}
