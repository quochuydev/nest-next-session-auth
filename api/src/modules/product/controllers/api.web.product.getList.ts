import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthUser } from "../../../core/decorators";
import { Product } from "../product.entity";
import { ProductService } from "../product.service";

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  @Post("api.web.product.getList")
  async handle(@Body() data: any): Promise<{ items: Product[] }> {
    const items = await this.productRepository.find();

    return {
      items,
    };
  }
}
