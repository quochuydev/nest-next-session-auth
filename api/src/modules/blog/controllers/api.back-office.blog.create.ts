import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthUser } from "../../../core/decorators";
import { ProductDto } from "../blog.dto";
import { Product } from "../blog.entity";
import { ProductService } from "../blog.service";

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  @Post("api.back-office.product.create")
  async createProduct(
    @AuthUser("id") userId: string,
    @Body() data: ProductDto
  ): Promise<Product> {
    const newProduct = new Product({
      ...data,
    });

    const product = await newProduct.save();

    return product;
  }
}
