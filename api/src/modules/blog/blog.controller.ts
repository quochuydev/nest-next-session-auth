import { Controller, Post, Body, Param } from "@nestjs/common";
import { AuthUser } from "../../core/decorators";
import { CrudController } from "../../packages/crud";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";

@Controller("blogs")
export class BlogController extends CrudController<Blog> {
  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }
}
