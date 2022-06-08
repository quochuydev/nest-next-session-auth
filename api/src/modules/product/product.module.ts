import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Variant } from "./variant.entity";
import { ReviewModule } from "../review/review.module";
import { VariantService } from "./variant.service";
import { ProductController } from "./product.controller";
import { ProductController as ApiBackOfficeProductCreate } from "./controllers/api.back-office.product.create";
import { ProductController as ApiBackOfficeProductGet } from "./controllers/api.back-office.product.get";
import { ProductController as ApiBackOfficeProductGetList } from "./controllers/api.back-office.product.getList";
import { ProductController as ApiWebProductGetList } from "./controllers/api.web.product.getList";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant]), ReviewModule],
  providers: [ProductService, VariantService],
  controllers: [
    ProductController,
    ApiBackOfficeProductCreate,
    ApiBackOfficeProductGet,
    ApiBackOfficeProductGetList,
    ApiWebProductGetList,
  ],
})
export class ProductModule {}
