import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],

  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
