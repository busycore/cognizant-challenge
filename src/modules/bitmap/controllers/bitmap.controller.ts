import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FoundOccurencesDTO } from '../dtos/FoundOccurencesDTO';
import { vectorAnDTO } from '../dtos/vectorANDTO';
import { BitmapService } from '../services/bitmap.service';

@ApiTags('bitmap')
@Controller('bitmap')
export class BitmapController {
  constructor(private readonly bitmapService: BitmapService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The operation was completed succesfully.',
    type: [FoundOccurencesDTO],
  })
  @ApiOperation({
    summary: 'Found An in bitmap',
    description:
      'Given an An vector retrive an new JSON counting the occurences of it in a given matrice',
  })
  create(@Body() vectorAn: vectorAnDTO): Promise<FoundOccurencesDTO[]> {
    return this.bitmapService.getVectorIntersection(vectorAn.An);
  }
}
