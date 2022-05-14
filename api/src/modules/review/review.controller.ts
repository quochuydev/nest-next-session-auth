import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';

import { AuthUser } from '../../core/decorators';
import { CrudController } from '../../packages/crud';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController extends CrudController<Review> {
  constructor(private readonly reviewService: ReviewService) {
    super(reviewService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@AuthUser('id') userId: string, @Body() body: any): Promise<Review> {
    return this.reviewService.create({ userId, ...body });
  }
}
