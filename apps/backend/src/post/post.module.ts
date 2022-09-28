import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostRepository } from './domain/ports/post.repository';
import { PostService } from './domain/ports/post.service';
import {
  PostController,
  CommentController,
  UserController,
} from './adapters/api-rest';
import { PostApiService } from './adapters/service/postApi.service';
import { PostApiRespository } from './adapters/respository/postApi.respository';

@Module({
  imports: [HttpModule],
  controllers: [PostController, CommentController, UserController],
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
