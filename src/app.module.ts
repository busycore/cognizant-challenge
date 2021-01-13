import { Module } from '@nestjs/common';
import { RacesModule } from './modules/races/races.module';
import { BitmapModule } from './modules/bitmap/bitmap.module';

@Module({
  imports: [RacesModule, BitmapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
