import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LinkService } from '../service/link.service';

@ApiTags('S3')
@Controller('s3')
@ApiOkResponse({ description: 'Signed url send successfully' })
@ApiBadRequestResponse({ description: "File requested doesn't exist" })
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('signed-url/:key')
  getFile(@Param('key') key: string) {
    try {
      return this.linkService.getPresignedUrl(key);
    } catch (error) {
      throw new HttpException(
        'Error generating presigned URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
