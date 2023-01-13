import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SpreadsheetRowService } from './spreadsheet_row.service';

@ApiTags('spreadsheet_rows')
@Controller('spreadsheet_rows')
export class SpreadsheetRowController {
  constructor(private readonly spreadsheetRowService: SpreadsheetRowService) {}
  // @IsPublic()
  @ApiBearerAuth()
  @Get('/spreadsheets/:spreadsheet_id')
  @ApiParam({
    name: 'spreadsheet_id',
    required: true,
    description: 'id da planilha',
    schema: { oneOf: [{ type: 'string' }] },
    example: '6394bb82237c2d9d8af4509a',
  })
  @ApiQuery({ name: 'page', schema: { type: 'string' }, example: '10' })
  @ApiQuery({ name: 'limit', schema: { type: 'string' }, example: '10' })
  @HttpCode(200)
  async findAllBySpreadsheetId(@Param() spreadsheet_id, @Req() req: Request) {
    const { page, limit } = req.query;
    const pageInt = parseInt(page as string);
    const limitInt = parseInt(limit as string);

    console.log(parseInt(page as string), parseInt(limit as string));
    const spreadsheet_id_param = spreadsheet_id.spreadsheet_id;
    console.log(spreadsheet_id_param);

    const count_total_rows =
      await this.spreadsheetRowService.countBySpreadsheetId(
        spreadsheet_id_param,
      );
    console.log(count_total_rows);
    // return spreadsheet_id;
    const rows = await this.spreadsheetRowService.findAllBySpreadsheetId(
      spreadsheet_id_param,
      pageInt,
      limitInt,
    );

    return { data: rows, total: count_total_rows };
  }
}
