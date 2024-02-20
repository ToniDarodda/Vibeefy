import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './app.service';
import { UserController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './modules/playlist/playlist.module';

const modules = [UserModule, PlaylistModule];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MUSIC_ARTIST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    ...modules,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class AppModule {}
