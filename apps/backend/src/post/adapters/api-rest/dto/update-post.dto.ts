import { IsNotEmpty } from 'class-validator';

export class PostCommandUpdate {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  userId: number;
}
