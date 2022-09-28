import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from '../../domain/model';
import { PostApiService } from '../service/postApi.service';
// import { TicketService } from 'src/ticket/domain/ports/ticket.service';

// import { TicketCommand } from './ticket.command';
@ApiTags('comment')
@Controller({
  path: 'comment',
  version: ['1'],
})
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(private postService: PostApiService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<Comment[]> {
    try {
      const comments = await this.postService.getComments(+id);
      return comments;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'An error occurred while getting comment details',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
