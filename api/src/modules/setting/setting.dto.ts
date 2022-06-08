import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class SettingDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: string | number;
}
