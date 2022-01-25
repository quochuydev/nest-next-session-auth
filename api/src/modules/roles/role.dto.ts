import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  permissions: string[];
}
