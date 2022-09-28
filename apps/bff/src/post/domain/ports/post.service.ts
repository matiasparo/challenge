import { Inject, Injectable, Logger } from '@nestjs/common';
import { Post } from '../models';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository) private readonly postRepository: PostRepository,
  ) {}

  async get(postId: number): Promise<Post> {
    try {
      const post = await this.postRepository.getPost(postId);

      const user = await this.postRepository.getUser(post.user.id);

      const comments = await this.postRepository.getComment(postId);

      const postDetail = new Post(
        post.id,
        post.title,
        post.body,
        comments,
        user,
      );

      return postDetail;
    } catch (e) {
      Logger.error(e)
      throw new Error('Error getting Detail post');
    }
  }
}
