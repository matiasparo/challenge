import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Post } from '../../domain/model/post.model';
import { PostRepository } from '../../domain/ports/post.repository';
import { Comment, User } from '../../domain/model';

@Injectable()
export class PostApiRespository implements PostRepository {
  URL: string;

  constructor(private readonly httpService: HttpService) {
    this.URL = process.env.URL_API_POSTS;
  }

  async create(post: Post): Promise<Post> {
    try {
      const postCreateResponse: AxiosResponse =
        await this.httpService.axiosRef.post(`${this.URL}`, post);
      if (postCreateResponse.status !== 201) {
        throw new Error('Error creating post');
      }
      const postSaved = postCreateResponse.data;
      return postSaved;
    } catch (error) {
      throw new Error('Error creating post');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const postsResponse: AxiosResponse = await this.httpService.axiosRef.get(
        `${this.URL}`,
      );

      if (postsResponse.status !== 200) {
        return [];
      }
      //TODO: map to post model
      return postsResponse.data;
    } catch (e) {
      throw new Error('Error getting posts');
    }
  }

  async update(post: Post): Promise<Post> {
    try {
      const postCreateResponse: AxiosResponse =
        await this.httpService.axiosRef.patch(`${this.URL}/${post.id}`, post);
      if (postCreateResponse.status !== 200) {
        throw new Error('Error update post');
      }
      //TODO: map to post model
      const postUpdate = postCreateResponse.data;
      return postUpdate;
    } catch (error) {
      throw new Error('Error update post');
    }
  }

  async delete(postId: number): Promise<boolean> {
    try {
      const postDeleteResponse: AxiosResponse =
        await this.httpService.axiosRef.delete(`${this.URL}/${postId}`);
      if (postDeleteResponse.status !== 200) {
        throw new Error('Error delete post');
      }
      return true;
    } catch (error) {
      throw new Error('Error delete post');
    }
  }
  async get(postId: number): Promise<Post> {
    try {
      const postsResponse: AxiosResponse = await this.httpService.axiosRef.get(
        `${this.URL}/${postId}`,
      );

      // console.log(postsResponse.status);
      if (postsResponse.status !== 200) {
        return null;
      }
      //TODO: map to post model
      return postsResponse.data;
    } catch (e) {
      throw new Error('Error getting posts');
    }
  }

  async getComment(postId: number): Promise<Comment[]> {
    try {
      const commentResponse: AxiosResponse =
        await this.httpService.axiosRef.get(`${this.URL}/${postId}/comments`);

      if (commentResponse.status !== 200) {
        throw new Error(`Error getting comment  by id ${postId}`);
      }
      //TODO: map to post model
      return commentResponse.data;
    } catch (e) {
      throw new Error('Error getting comment');
    }
  }

  async getUser(userId: number): Promise<User> {
    try {
      const userResponse: AxiosResponse = await this.httpService.axiosRef.get(
        `${process.env.URL_API_USERS}/${userId}`,
      );

      if (userResponse.status !== 200) {
        throw new Error(`Error getting User  by id ${userId}`);
      }
      //TODO: map to post model
      return userResponse.data;
    } catch (e) {
      throw new Error('Error getting User');
    }
  }
}
