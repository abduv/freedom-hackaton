import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BodyDto } from './body.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('resumes'))
  uploadData(
    @Body() body: BodyDto,
    @UploadedFiles() resumes: Array<Express.Multer.File>,
  ) {
    console.log({ body, resumes });
    return this.appService.uploadData();
  }
}
