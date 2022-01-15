import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { Session } from "./entities/session.entity";

@Injectable()
export class AuthService {
  saltRounds: number;

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Session) private sessionRepository: Repository<Session>
  ) {
    this.saltRounds = 10;
  }

  private async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  getMe(userId: string): Promise<User> {
    return this.userService.findOne({ where: { id: userId } });
  }

  async register(data: RegisterDto) {
    await this.userService.checkExist(data.username);

    const password = await this.getPasswordHash(data.password);

    return this.userService.create({
      ...data,
      password,
    });
  }

  async login(data: LoginDto): Promise<User> {
    const { username, password } = data;

    const user = await this.userService.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async generateSession(data: {
    ip: string;
    userAgent: string;
    user: Partial<User>;
  }): Promise<string> {
    const newSession = new Session({
      ip: data.ip,
      userAgent: data.userAgent,
      userId: data.user.id,
    });

    const session = await newSession.save();

    return jwt.sign({ user: data.user, id: session.id }, "ACCESS_TOKEN", {
      expiresIn: "30d",
    });
  }

  async getSession(token: string) {
    try {
      const decoded = jwt.verify(token, "ACCESS_TOKEN");
      const session = await this.sessionRepository.findOne({ id: decoded.id });
      return session ? decoded : null;
    } catch (error) {
      return null;
    }
  }
}
