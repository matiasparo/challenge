import { IsNotEmpty } from 'class-validator';

export class PostCommandCreate {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  userId: number;
}
