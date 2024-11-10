import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTModule } from './chat-gpt/chat-gpt.module';

@Module({
  imports: [ChatGPTModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
