import { Module } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';

@Module({
  imports: [],
  providers: [ChatGPTService],
  exports: [ChatGPTService],
})
export class ChatGPTModule {}
