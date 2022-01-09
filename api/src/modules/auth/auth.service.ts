import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { Session } from './entities/session.entity';

@Injectable()
export class AuthService {
  saltRounds: number;

  constructor(
    private readonly userService: UserService,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {
    this.saltRounds = 10;
  }

  async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async register(data: {
    firstName: string;
    username: string;
    email: string;
    password: string;
  }) {
    await this.userService.checkExist(data.username);

    const password = await this.getPasswordHash(data.password);
    console.log({ password });

    return this.userService.create({
      ...data,
      password,
    });
  }

  login(data) {
    return data;
  }

  async generateSession(data: {
    ip: string;
    userAgent: string;
    user: { id: string };
  }): Promise<string> {
    const newSession = new Session({
      ip: data.ip,
      userAgent: data.userAgent,
      userId: data.user.id,
    });

    const session = await newSession.save();

    return jwt.sign({ user: data.user, id: session.id }, 'ACCESS_TOKEN', {
      expiresIn: '30d',
    });
  }

  async getSession(token: string) {
    try {
      const decoded = jwt.verify(token, 'ACCESS_TOKEN');
      const session = await this.sessionRepository.findOne({ id: decoded.id });
      return session ? decoded : null;
    } catch (error) {
      return null;
    }
  }
}
