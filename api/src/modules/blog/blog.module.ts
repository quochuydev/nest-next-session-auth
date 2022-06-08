import { Module } from "@nestjs/common";
import { ProductService } from "./blog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./blog.entity";
import { ReviewModule } from "../review/review.module";
import { ProductController } from "./blog.controller";
import { ProductController as ApiBackOfficeProductCreate } from "./controllers/api.back-office.blog.create";
import { ProductController as ApiBackOfficeProductGet } from "./controllers/api.back-office.blog.get";
import { ProductController as ApiBackOfficeProductGetList } from "./controllers/api.back-office.blog.getList";
import { ProductController as ApiWebProductGetList } from "./controllers/api.web.blog.getList";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ReviewModule],
  providers: [ProductService],
  controllers: [
    ProductController,
    ApiBackOfficeProductCreate,
    ApiBackOfficeProductGet,
    ApiBackOfficeProductGetList,
    ApiWebProductGetList,
  ],
})
export class ProductModule {}
