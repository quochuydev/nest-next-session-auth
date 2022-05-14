import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
