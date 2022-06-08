import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/packages/crud';
import { Repository } from 'typeorm';
import { ReviewService } from '../review/review.service';
import { Product } from './product.entity';
import { Variant } from './variant.entity';

@Injectable()
export class VariantService extends CrudService<Variant> {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly reviewService: ReviewService,
  ) {
    super(variantRepository);
  }
}
