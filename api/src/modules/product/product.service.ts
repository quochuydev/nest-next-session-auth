import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/packages/crud';
import { Repository } from 'typeorm';
import { ReviewService } from '../review/review.service';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { Variant } from './variant.entity';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly reviewService: ReviewService,
  ) {
    super(productRepository);
  }

  async review(productId: string, userId: string, data: any) {
    const product = await this.productRepository.findOne({ id: productId });
    const review = await this.reviewService.create({
      userId,
      ...data,
    });
    product.reviews.push(review);
    return this.productRepository.save(product);
  }

  async create(data: ProductDto): Promise<Product> {
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
