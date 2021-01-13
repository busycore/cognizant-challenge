import { ApiProperty } from '@nestjs/swagger';

export class LogUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
