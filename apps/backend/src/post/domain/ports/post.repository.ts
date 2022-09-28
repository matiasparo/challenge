import { Post, Comment, User } from '../model';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(idPost: number): Promise<boolean>;
  get(postId: number): Promise<Post>;
  findAll(): Promise<Post[]>;

  getComment(postId: number): Promise<Comment[]>;
  getUser(userId: number): Promise<User>;
}

export const PostRepository = Symbol('PostRepository');
