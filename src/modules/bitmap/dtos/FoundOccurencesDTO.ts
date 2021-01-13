import { ApiProperty } from '@nestjs/swagger';

export class FoundOccurencesDTO {
  @ApiProperty()
  value: number;
  @ApiProperty()
  occurences: number;
}
