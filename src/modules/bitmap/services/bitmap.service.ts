import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import FindVectorInMatriceService from './FindVectorInMatriceService';
import { IFindVectorInMatriceService } from './IFindVectorInMatriceService';

@Injectable()
export class BitmapService {
  constructor(
    @Inject(FindVectorInMatriceService)
    private findaNumbersInMatriceService: IFindVectorInMatriceService,
  ) {}
  async getVectorIntersection(vectorAn: number[]) {
    return this.findaNumbersInMatriceService.execute(vectorAn);
  }
}
