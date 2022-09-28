import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostModel } from '../../domain/models';
import { PostApiService } from './postApi.service';

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

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id: number): Promise<PostModel> {
    try {
      const post = await this.postService.get(+id);
      return post;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'An error occurred while getting post details',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
