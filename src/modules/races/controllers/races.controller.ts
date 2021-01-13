import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { RacesService } from '../services/races.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { LogUploadDTO } from '../dtos/LogUploadDTO';
import RaceResumeDTO from '../dtos/RaceResumeDTO';

@ApiTags('races')
@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post('upload')
  @ApiOperation({
    description: 'Given an race log, displays the summary',
    summary: 'Race Resume',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The operation was completed succesfully.',
    type: [RaceResumeDTO],
  })
  @ApiBody({
    description: 'Log with the race stats',
    type: LogUploadDTO,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: LogUploadDTO,
  ): Promise<RaceResumeDTO[]> {
    return await this.racesService.getRaceSummary(file);
  }
}
