import { Module } from '@nestjs/common';
import { LinkModule } from './module/link/link.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './utils/env.utils';

const modules = [LinkModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...modules,
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class AppModule {}
