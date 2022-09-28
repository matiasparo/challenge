import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../domain/model';
import { PostApiService } from '../service/postApi.service';
// import { TicketService } from 'src/ticket/domain/ports/ticket.service';

// import { TicketCommand } from './ticket.command';
@ApiTags('user')
@Controller({
  path: 'user',
  version: ['1'],
})
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private postService: PostApiService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.postService.getUser(+id);
      return user;
    } catch (e) {
      throw new HttpException(
        'An error occurred while getting User',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
