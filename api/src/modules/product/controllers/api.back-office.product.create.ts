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

  @Post("api.back-office.product.create")
  async createProduct(
    @AuthUser("id") userId: string,
    @Body() data: ProductDto
  ): Promise<Product> {
    const variants = [];

    for (let i = 0; i < data.variants.length; i++) {
      const item = data.variants[i];
      const newVariant = new Variant(item);
      const variant = await newVariant.save();
      variants.push(variant);
    }

    const newProduct = new Product({
      ...data,
      variants,
    });

    const product = await newProduct.save();

    //TODO

    return product;
  }
}
