import { Module } from '@nestjs/common';

import { ArtistManagerController } from './controller/artist-manager.controller';
import { ArtistManagerService } from './service/artist-manager.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const { ARTISTHOST, ARTISTPORT } = process.env;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MUSIC_ARTIST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: ARTISTHOST,
          port: +ARTISTPORT,
        },
      },
    ]),
  ],
  controllers: [ArtistManagerController],
  providers: [ArtistManagerService],
})
export class MicroServiceModule {}
