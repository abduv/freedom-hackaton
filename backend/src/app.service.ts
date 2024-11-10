import { Injectable } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt/chat-gpt.service';

@Injectable()
export class AppService {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  uploadData(): string {
    // this.chatGPTService.hello();
    return 'Hello World!';
  }
}
