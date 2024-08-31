import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Spreadsheet } from './entities/spreadsheet.entity';

@Injectable()
export class SpreadsheetService {
  constructor(
    @InjectRepository(Spreadsheet)
    private readonly spreadsheetRepository: MongoRepository<Spreadsheet>,
  ) {}

  async findByID(id: string) {
    // eslint-disable-next-line
    const spreadheet = await this.spreadsheetRepository.findOneBy(id);
    console.log(spreadheet);
    return spreadheet;
  }

  async findAll(
    page: number,
    limit: number,
  ) {
    const spreadheet_rows = await this.spreadsheetRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log(spreadheet_rows);
    return spreadheet_rows;
  }

  async count() {
    const count = await this.spreadsheetRepository.count();
    console.log(count);
    return count;
  }

  async update(id: string, spreadsheet: Partial<Spreadsheet>) {
    // eslint-disable-next-line
    const spreadheet = await this.spreadsheetRepository.update(id, spreadsheet);
    return spreadheet;
  }
}
