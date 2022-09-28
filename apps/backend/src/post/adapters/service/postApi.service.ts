import { Injectable } from '@nestjs/common';
import { Post, Comment, User } from '../../domain/model';
import { PostService } from '../../domain/ports/post.service';
import { PostCommandCreate, PostCommandUpdate } from '../api-rest/dto';

@Injectable()
export class PostApiService {
  constructor(private postService: PostService) {}

  async create(postCommand: PostCommandCreate): Promise<Post> {
    return this.postService.create(
      postCommand.title,
      postCommand.body,
      postCommand.userId,
    );
  }

  delete(idPost: number): Promise<boolean> {
    return this.postService.delete(idPost);
  }

  update(idPost: number, post: PostCommandUpdate): Promise<Post> {
    const postUpdate = new Post(post.title, post.body, post.userId, idPost);
    return this.postService.update(postUpdate);
  }

  get(id: number): Promise<Post> {
    return this.postService.get(id);
  }

  async findAll(): Promise<Post[]> {
    const allPost = await this.postService.findAll();
    return allPost;
  }

  //TODO: move functionality to specific modules/use cases
  getComments(idPost: number): Promise<Comment[]> {
    return this.postService.getComment(idPost);
  }
  //TODO: move functionality to specific modules/use cases
  getUser(id: number): Promise<User> {
    return this.postService.getUser(id);
  }
}
