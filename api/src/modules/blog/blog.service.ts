import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/packages/crud";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";

@Injectable()
export class BlogService extends CrudService<Blog> {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) {
    super(blogRepository);
  }
}
