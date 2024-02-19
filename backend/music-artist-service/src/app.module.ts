import { Module } from '@nestjs/common';
import { ArtistController } from './app.controller';
import { ArtistService } from './app.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class AppModule {}
