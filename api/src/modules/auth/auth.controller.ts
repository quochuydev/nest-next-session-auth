import { Body, Post, Controller, Res, Req, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data) {
    return this.authService.register(data);
  }

  @Get('login')
  async test(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data,
  ) {
    return 'test';
  }

  @Post('login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data,
  ) {
    const user = await this.authService.login(data);

    // TODO
    // const token = await this.sessionService.generate({
    //   ip: req.ip,
    //   userAgent: req.headers['user-agent'],
    //   user: { id: user.id },
    // });

    // res.cookie('token', token, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });

    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { success: true };
  }
}
