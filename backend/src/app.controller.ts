import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BodyDto } from './body.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('resumes'))
  uploadData(@Body() body: BodyDto, @UploadedFiles() resumes: File[]) {
    return this.appService.uploadData(body.vacancy, resumes);
  }
}
