import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/packages/crud';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
