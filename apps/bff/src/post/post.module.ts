import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostController } from './adapters/api-rest/post.controller';
import { PostApiService } from './adapters/api-rest/postApi.service';
import { PostApiRespository } from './adapters/repository/postApi.respository';
import { PostRepository } from './domain/ports/post.repository';
import { PostService } from './domain/ports/post.service';

@Module({
  imports: [HttpModule],
  controllers: [PostController],
  providers: [
    PostService,
    PostApiService,
    {
      provide: PostRepository,
      useClass: PostApiRespository,
    },
  ],
  exports: [],
})
export class PostModule {}
