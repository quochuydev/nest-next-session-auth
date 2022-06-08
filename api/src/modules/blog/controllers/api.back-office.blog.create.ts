import { Controller, Post, Body } from "@nestjs/common";
import { AuthUser } from "../../../core/decorators";
import { BlogDto } from "../blog.dto";
import { Blog } from "../blog.entity";

@Controller()
export class BlogController {
  constructor() {}

  @Post("api.back-office.blog.create")
  async handle(
    @AuthUser("id") userId: string,
    @Body() data: BlogDto
  ): Promise<Blog> {
    const newBlog = new Blog({
      ...data,
    });

    const blog = await newBlog.save();

    return blog;
  }
}
