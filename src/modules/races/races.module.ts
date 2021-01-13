import { Module } from '@nestjs/common';
import { RacesService } from './services/races.service';
import { RacesController } from './controllers/races.controller';
import LocalStorageFileUploadProvider from 'src/shared/providers/FileUploadProvider/implementations/LocalStorageFileUpload.provider';
import CSVToJsonProvider from 'src/shared/providers/CSVtoJsonProvider/implementations/CSVToJson.provider';
import GetRaceSummaryService from './services/GetRaceSummaryService';

@Module({
  controllers: [RacesController],
  providers: [
    RacesService,
    LocalStorageFileUploadProvider,
    CSVToJsonProvider,
    GetRaceSummaryService,
  ],
})
export class RacesModule {}
