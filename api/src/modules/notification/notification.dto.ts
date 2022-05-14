import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
