import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetsController } from './spreadsheets.controller';

describe('SpreadsheetsController', () => {
  let controller: SpreadsheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsheetsController],
    }).compile();

    controller = module.get<SpreadsheetsController>(SpreadsheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
