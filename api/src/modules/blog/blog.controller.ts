import { Controller, Post, Body, Param } from "@nestjs/common";
import { AuthUser } from "../../core/decorators";
import { CrudController } from "../../packages/crud";
import { Product } from "./blog.entity";
import { ProductService } from "./blog.service";

@Controller("products")
export class ProductController extends CrudController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }
}
