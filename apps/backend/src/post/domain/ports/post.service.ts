import { Inject, Injectable } from '@nestjs/common';
import { Post, Comment, User } from '../model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository) private readonly postRepository: PostRepository,
  ) {}

  create(title: string, body: string, userId: number): Promise<Post> {
    const post = new Post(title, body, userId);
    const postCreate = this.postRepository.create(post);
    return postCreate;
  }

  delete(idPost: number): Promise<boolean> {
    return this.postRepository.delete(idPost);
  }

  update(post: Post): Promise<Post> {
    return this.postRepository.update(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  get(postId: number): Promise<Post> {
    return this.postRepository.get(postId);
  }

  getComment(postId: number): Promise<Comment[]> {
    return this.postRepository.getComment(postId);
  }

  getUser(userId: number): Promise<User> {
    return this.postRepository.getUser(userId);
  }
}
