import { Controller, UseGuards } from '@nestjs/common';
import { CrudController } from 'src/packages/crud';
import { AdminGuard } from '../auth/admin.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('admin/categories')
@UseGuards(AdminGuard)
export class CategoryController extends CrudController<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }
}
