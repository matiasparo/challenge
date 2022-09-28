import { Injectable } from '@nestjs/common';
import { Post } from '../../domain/models';
import { PostService } from '../../domain/ports/post.service';

@Injectable()
export class PostApiService {
  constructor(private postService: PostService) {}
  get(id: number): Promise<Post> {
    return this.postService.get(id);
  }
}
