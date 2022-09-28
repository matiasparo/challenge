import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostModel } from '../../domain/model/post.model';
import { PostCommandCreate, PostCommandUpdate } from './dto';
import { PostApiService } from '../service/postApi.service';
// import { TicketService } from 'src/ticket/domain/ports/ticket.service';

// import { TicketCommand } from './ticket.command';
@ApiTags('post')
@Controller({
  path: 'post',
  version: ['1'],
})
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private postService: PostApiService) {}

  @Get()
  async findAll(): Promise<PostModel[]> {
    try {
      return await this.postService.findAll();
    } catch (e) {
      throw new HttpException(
        'An error occurred while getting all post',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<PostModel> {
    try {
      const post = await this.postService.get(+id);
      return post;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'An error occurred while getting post',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Post()
  async create(@Body() postCommand: PostCommandCreate): Promise<PostModel> {
    try {
      const post = await this.postService.create(postCommand);
      return post;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'An error occurred while create post',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() postCommand: PostCommandUpdate,
  ): Promise<PostModel> {
    try {
      const post = await this.postService.update(+id, postCommand);
      return post;
    } catch (e) {
      throw new HttpException(
        'An error occurred while update post',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      const resp = this.postService.delete(+id);
      return resp;
    } catch (e) {
      throw new HttpException(
        'An error occurred while delete post',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
