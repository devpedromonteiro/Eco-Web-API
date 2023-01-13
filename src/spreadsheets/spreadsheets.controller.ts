import { Body, Controller, Get, HttpCode, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Request } from 'express';
import { SpreadsheetService } from './spreadsheet.service';
import { Spreadsheet } from './entities/spreadsheet.entity';

@ApiTags('spreadsheets')
@Controller('spreadsheets')
export class SpreadsheetsController {
  constructor(private readonly spreadsheetsService: SpreadsheetService) {}

  @ApiBearerAuth()
  @Get('/:spreadsheet_id')
  @ApiParam({
    name: 'spreadsheet_id',
    required: true,
    description: 'id da planilha',
    schema: { oneOf: [{ type: 'string' }] },
    example: '6394bb82237c2d9d8af4509a',
  })
  find(@Param() spreadsheet_id,@Req() req: Request) {
    const spreadsheet_id_param = spreadsheet_id.spreadsheet_id;
    return this.spreadsheetsService.findByID(spreadsheet_id_param);
  }

  @ApiBearerAuth()
  @Put()
  async setIsPublic(@Req() req: Request) {
    const { is_public, spreadsheet_id } = req.body;
    let spreadsheet: Partial<Spreadsheet> = {
      is_public,
      download_link: '',
    };

    if (is_public) {
      const original_spreadsheet = await this.spreadsheetsService.findByID(
        spreadsheet_id,
      );
      // TODO trocar por environment
      spreadsheet.download_link = `https://${'bucket-eco-data'}.s3.amazonaws.com/${
        original_spreadsheet.file_s3_key
      }`;
    }

    return this.spreadsheetsService.update(
      spreadsheet_id,
      spreadsheet,
    );
  }

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: 'page', schema: { type: 'string' }, example: '10' })
  @ApiQuery({ name: 'limit', schema: { type: 'string' }, example: '10' })
  @HttpCode(200)
  async findAll(@Req() req: Request): Promise<{ data: any; total: any }> {
    const { page, limit } = req.query;
    const pageInt = parseInt(page as string);
    const limitInt = parseInt(limit as string);

    console.log(parseInt(page as string), parseInt(limit as string));

    const count_total = await this.spreadsheetsService.count();

    const rows = await this.spreadsheetsService.findAll(pageInt, limitInt);

    return { data: rows, total: count_total };
  }
}
