import { Module } from '@nestjs/common';
import { LinkController } from './controller/link.controller';
import { LinkService } from './service/link.service';
import { EnvConfigService } from 'src/utils/env.utils';

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [LinkService, EnvConfigService],
})
export class LinkModule {}
