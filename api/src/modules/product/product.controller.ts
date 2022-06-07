import { Controller, Post, Body, Param } from "@nestjs/common";
import { AuthUser } from "../../core/decorators";
import { CrudController } from "../../packages/crud";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController extends CrudController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  @Post("/:id/review")
  review(
    @AuthUser("id") userId: string,
    @Body() body: any,
    @Param() id: string
  ): Promise<Product> {
    return this.productService.review(id, userId, body);
  }
}
