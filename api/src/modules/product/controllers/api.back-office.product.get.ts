import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Variant } from "../variant.entity";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthUser } from "../../../core/decorators";
import { ProductDto } from "../product.dto";
import { Product } from "../product.entity";
import { ProductService } from "../product.service";

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  @Post("api.back-office.product.get")
  async handle(
    @AuthUser("id") userId: string,
    @Body() data: any
  ): Promise<Product> {
    return this.productRepository.findOne(data.id);
  }
}
