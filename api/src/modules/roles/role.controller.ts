import { Controller, Post, Body } from "@nestjs/common";

import { RoleDto } from "./role.dto";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";

@Controller("roles")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() body: RoleDto): Promise<Role> {
    return this.roleService.create(body);
  }
}
