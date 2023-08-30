import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogPost } from './entities/blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get('posts')
  async getBlogPosts(
    @Query() query,
  ): Promise<{ posts: BlogPost[]; totalCount: number }> {
    const { page = 1, limit = 10, search } = query;
    return this.blogService.findAll(page, limit, search);
  }

  @Get('posts/:id')
  async getBlogPost(@Param('id') id: number): Promise<BlogPost> {
    return this.blogService.findOne(id);
  }

  @Post('posts')
  async createBlogPost(@Body() postData: Partial<BlogPost>): Promise<BlogPost> {
    return this.blogService.create(postData);
  }

  @Put('posts/:id')
  async updateBlogPost(
    @Param('id') id: number,
    @Body() postData: Partial<BlogPost>,
  ): Promise<BlogPost> {
    return this.blogService.update(id, postData);
  }

  @Delete('posts/:id')
  async deleteBlogPost(@Param('id') id: number): Promise<void> {
    return this.blogService.remove(id);
  }
}
