import { User, Comment } from './index';

export class Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
  user: Partial<User>;

  constructor(
    id: number,
    title: string,
    body: string,
    comments?: Comment[],
    user?: Partial<User>,
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.comments = comments;
    this.user = user;
  }
}
