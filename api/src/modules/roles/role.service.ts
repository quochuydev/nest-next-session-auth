import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  create(data: Partial<Role>): Promise<Role> {
    const newRole = new Role(data);
    return this.roleRepository.save(newRole);
  }
}
