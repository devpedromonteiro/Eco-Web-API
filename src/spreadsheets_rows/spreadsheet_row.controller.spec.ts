import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetRowController } from './spreadsheet_row.controller';

describe('SpreadsheetRowController', () => {
  let controller: SpreadsheetRowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsheetRowController],
    }).compile();

    controller = module.get<SpreadsheetRowController>(SpreadsheetRowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
