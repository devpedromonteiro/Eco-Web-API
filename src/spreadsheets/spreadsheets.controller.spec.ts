import { Test, TestingModule } from '@nestjs/testing';
import { SpreadsheetsController } from './spreadsheets.controller';
import { SpreadsheetService } from './spreadsheet.service';
import { Spreadsheet } from './entities/spreadsheet.entity';
import { ObjectID } from 'mongodb';

describe('SpreadsheetsController', () => {
  let controller: SpreadsheetsController;
  let service: SpreadsheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpreadsheetsController],
      providers: [
        {
          provide: SpreadsheetService,
          useValue: {
            findByID: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SpreadsheetsController>(SpreadsheetsController);
    service = module.get<SpreadsheetService>(SpreadsheetService);
  });

  it('should return a spreadsheet when a valid ID is provided', async () => {
    // Arrange
    const id = new ObjectID('5f50c31e8559b8d9c2466e3d');

    const mockSpreadsheet = new Spreadsheet({
      id,
      name: 'Test Spreadsheet',
    });

    jest.spyOn(service, 'findByID').mockResolvedValue(mockSpreadsheet);

    // Act
    const result = await controller.find({ spreadsheet_id: id }, {} as any);

    // Assert
    expect(result).toEqual(mockSpreadsheet);
    expect(service.findByID).toHaveBeenCalledWith(id);
  });

  it('should update a spreadsheet visibility and add download link if public', async () => {
    // Arrange
    const mockRequest = {
      body: { is_public: true, spreadsheet_id: '5f50c31e8559b8d9c2466e3d' },
    } as unknown as Request;

    const mockSpreadsheet = new Spreadsheet({
      id: new ObjectID('5f50c31e8559b8d9c2466e3d'),
      file_s3_key: 'file_key',
      is_public: 0,
      download_link: '',
    });

    jest.spyOn(service, 'findByID').mockResolvedValue(mockSpreadsheet);
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => ({
        affected: 1,
        raw: {},
        generatedMaps: [],
      }));

    // Act
    const result = await controller.setIsPublic(mockRequest as any);

    // Assert
    expect(result.affected).toBe(1);
    expect(service.update).toHaveBeenCalledWith(
      '5f50c31e8559b8d9c2466e3d',
      expect.objectContaining({
        download_link: expect.stringContaining('s3-bucket-eco-data'),
      }),
    );
  });

  it('should return paginated spreadsheets with total count', async () => {
    // Arrange
    const mockRequest = {
      query: { page: '1', limit: '10' },
    } as unknown as Request;

    const mockSpreadsheets = [
      new Spreadsheet({ id: new ObjectID('5f50c31e8559b8d9c2466e3d'), name: 'Test 1' }),
      new Spreadsheet({ id: new ObjectID('5f50c31e8559b8d9c2466e3e'), name: 'Test 2' }),
    ];
    
    jest.spyOn(service, 'findAll').mockResolvedValue(mockSpreadsheets);
    jest.spyOn(service, 'count').mockResolvedValue(20);
  
    // Act
    const result = await controller.findAll(mockRequest as any);

    // Assert
    expect(result.data).toEqual(mockSpreadsheets);
    expect(result.total).toBe(20);
    expect(service.findAll).toHaveBeenCalledWith(1, 10);
  });
});
