import { User } from './user.model';

export class Post {
  id?: number;
  title: string;
  body: string;
  userId: number;

  constructor(title: string, body: string, userId: number, id?: number) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

}
