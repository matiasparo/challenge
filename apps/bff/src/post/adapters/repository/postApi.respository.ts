import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Post, User, Comment } from '../../domain/models';
import { PostRepository } from '../../domain/ports/post.repository';
import { PostApiModel } from './models';

@Injectable()
export class PostApiRespository implements PostRepository {
  URL: string;
  constructor(private readonly httpService: HttpService) {
    this.URL = process.env.URL_API_BACKEND;
  }

  async getPost(postId: number): Promise<Post> {
    try {
      const postsResponse: AxiosResponse = await this.httpService.axiosRef.get(
        `${this.URL}/post/${postId}`,
      );

      if (postsResponse.status !== 200) {
        throw new Error(`Error getting posts  by id ${postId}`);
      }

      const post: PostApiModel = postsResponse.data;
      return new Post(post.id, post.title, post.body, null, {
        id: post.userId,
      });
    } catch (e) {
      Logger.error(e);
      throw new Error('Error getting post');
    }
  }
  async getUser(userId: number): Promise<User> {
    try {
      const userResponse: AxiosResponse = await this.httpService.axiosRef.get(
        `${this.URL}/user/${userId}`,
      );

      if (userResponse.status !== 200) {
        throw new Error(`Error getting User  by id ${userId}`);
      }

      const userData = { ...userResponse.data };
      const addressData = { ...userResponse.data.address };
      const companyData = { ...userResponse.data.company };
      const userModel = new User(
        userData.id,
        userData.name,
        userData.username,
        userData.email,
        addressData,
        userData.phone,
        userData.website,
        companyData,
      );
      return userModel;
    } catch (e) {
      throw new Error('Error getting users');
    }
  }
  async getComment(postId: number): Promise<Comment[]> {
    try {
      const commentResponse: AxiosResponse =
        await this.httpService.axiosRef.get(`${this.URL}/comment/${postId}`);

      if (commentResponse.status !== 200) {
        throw new Error(`Error getting User  by id ${postId}`);
      }

      const commentData: Comment[] = commentResponse.data.map(
        (comment: Comment) => {
          return new Comment(
            comment.postId,
            comment.id,
            comment.name,
            comment.email,
            comment.body,
          );
        },
      );
      return commentData;
    } catch (e) {
      throw new Error('Error getting comment');
    }
  }
}
