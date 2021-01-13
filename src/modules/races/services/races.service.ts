import { Inject, Injectable } from '@nestjs/common';

import GetRaceSummaryService from './GetRaceSummaryService';
import { IGetRaceSummaryService } from './IGetRaceSummaryService';

@Injectable()
export class RacesService {
  constructor(
    @Inject(GetRaceSummaryService)
    private getRaceSummaryService: IGetRaceSummaryService,
  ) {}

  async getRaceSummary(file: any) {
    return this.getRaceSummaryService.execute(file);
  }
}
