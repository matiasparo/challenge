import { Post, User, Comment } from '../models';

export interface PostRepository {
  getPost(postId: number): Promise<Post>;
  getUser(userId: number): Promise<User>;
  getComment(postId: number): Promise<Comment[]>;
}

export const PostRepository = Symbol('PostRepository');
