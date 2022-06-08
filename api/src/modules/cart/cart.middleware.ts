import * as _ from "lodash";
import { Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { CartService } from "./cart.service";

@Injectable()
export class CartMiddleware implements NestMiddleware {
  constructor(private cartService: CartService) {}

  async use(
    req: Request & { user: string; ip: string; cart: any },
    res: Response,
    next: Function
  ) {
    const cart = _.get(req, "cookies.cart");

    if (cart) {
      req.cart = cart;
      console.log("use current cart", req.cart);
    } else {
      const _cart = await this.cartService.assertCart();

      res.cookie("cart", _cart, {
        httpOnly: true,
      });

      req.cart = _cart;
      console.log("create new cart", req.cart);
    }

    return next();
  }
}
