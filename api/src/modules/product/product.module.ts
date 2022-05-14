import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { Variant } from "./variant.entity";
import { ReviewModule } from "../review/review.module";
import { VariantService } from "./variant.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant]), ReviewModule],
  providers: [ProductService, VariantService],
  controllers: [ProductController],
})
export class ProductModule {}
