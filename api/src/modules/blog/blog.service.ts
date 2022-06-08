import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/packages/crud";
import { Repository } from "typeorm";
import { ReviewService } from "../review/review.service";
import { ProductDto } from "./blog.dto";
import { Product } from "./blog.entity";

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly reviewService: ReviewService
  ) {
    super(productRepository);
  }
}
