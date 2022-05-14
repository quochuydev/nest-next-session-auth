import { Body, Post, Controller, Res, Req, Get } from "@nestjs/common";
import { Response } from "express";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { AuthUser } from "../../core/decorators";
import { User } from "../user/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("me")
  getMe(@AuthUser("id") userId: string): Promise<User> {
    if (!userId) {
      return null;
    }

    return this.authService.getMe(userId);
  }

  @Post("register")
  register(@Body() data: RegisterDto): Promise<User> {
    return this.authService.register(data);
  }

  @Post("login")
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto
  ) {
    const user = await this.authService.login(data);

    const token = await this.authService.generateSession({
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      user,
    });

    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token");
    return { success: true };
  }
}
