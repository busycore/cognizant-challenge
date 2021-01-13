import { Module } from '@nestjs/common';
import { BitmapService } from './services/bitmap.service';
import { BitmapController } from './controllers/bitmap.controller';
import { JimpBitmapParserProvider } from 'src/shared/providers/BitmapParserProvider/implementations/JimpBitmapParser.provider';
import FindVectorInMatriceService from './services/FindVectorInMatriceService';

@Module({
  controllers: [BitmapController],
  providers: [
    BitmapService,
    JimpBitmapParserProvider,
    FindVectorInMatriceService,
  ],
})
export class BitmapModule {}
