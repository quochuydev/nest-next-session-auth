import * as _ from "lodash";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(
    req: Request & { user: string; ip: string },
    res: Response,
    next: Function
  ) {
    const token = _.get(req, "cookies.token");
    if (!token) {
      return next();
    }

    const auth = await this.authService.getSession(token);
    req.user = _.get(auth, "user", null);
    // console.log("AuthMiddleware", req.user);

    return next();
  }
}
