import { ApiProperty } from '@nestjs/swagger';

export class vectorAnDTO {
  @ApiProperty({ isArray: true, type: Number })
  An: number[];
}
