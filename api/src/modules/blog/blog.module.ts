import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./blog.entity";
import { ReviewModule } from "../review/review.module";
import { BlogController } from "./blog.controller";
import { BlogController as ApiBackOfficeBlogCreate } from "./controllers/api.back-office.blog.create";
import { BlogController as ApiBackOfficeBlogGet } from "./controllers/api.back-office.blog.get";
import { BlogController as ApiBackOfficeBlogGetList } from "./controllers/api.back-office.blog.getList";
import { BlogController as ApiWebBlogGetList } from "./controllers/api.web.blog.getList";

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), ReviewModule],
  providers: [BlogService],
  controllers: [
    BlogController,
    ApiBackOfficeBlogCreate,
    ApiBackOfficeBlogGet,
    ApiBackOfficeBlogGetList,
    ApiWebBlogGetList,
  ],
})
export class BlogModule {}
