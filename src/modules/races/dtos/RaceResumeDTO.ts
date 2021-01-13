import { ApiProperty } from '@nestjs/swagger';

export default class RaceResumeDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  position: number;
  @ApiProperty()
  voltas: number;
  @ApiProperty()
  total_race_time: number;
  @ApiProperty()
  better_time: string;
  @ApiProperty()
  average_speed: string;
}
