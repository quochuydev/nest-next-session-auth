import { Controller, UseGuards } from '@nestjs/common';
import { CrudController } from 'src/packages/crud';
import { UserGuard } from '../auth/user.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('office/categories')
@UseGuards(UserGuard)
export class OfficeCategoryController extends CrudController<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }
}
