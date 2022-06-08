import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthUser } from "../../../core/decorators";
import { Blog } from "../blog.entity";
import { BlogService } from "../blog.service";

@Controller()
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) {}

  @Post("api.web.blog.getList")
  async handle(@Body() data: any): Promise<{ items: Blog[] }> {
    const items = await this.blogRepository.find();

    return {
      items,
    };
  }
}
