import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async checkExist(username: string) {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new BadRequestException("EXISTED_USER");
    }
  }

  findOne(conditions: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOneOrFail(conditions);
  }

  create(data: Partial<User>) {
    const newUser = new User(data);
    return this.userRepository.save(newUser);
  }
}
