import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog.entity';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ posts: BlogPost[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const query = this.blogRepository
      .createQueryBuilder('post')
      .orderBy('post.id', 'DESC')
      .skip(skip)
      .take(take);

    if (search) {
      query.where('post.title ILIKE :search OR post.content ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [posts, totalCount] = await query.getManyAndCount();

    return { posts, totalCount };
  }

  async findOne(id: any): Promise<BlogPost | undefined> {
    return this.blogRepository.findOne(id);
  }

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    const newPost = this.blogRepository.create(data);
    return this.blogRepository.save(newPost);
  }

  async update(
    id: number,
    data: Partial<BlogPost>,
  ): Promise<BlogPost | undefined> {
    await this.blogRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const result = await this.blogRepository.delete(id);
    return result;
  }
}
