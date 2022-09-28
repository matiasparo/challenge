import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
