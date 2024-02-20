import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/entities/playlist/entity';
import { Repository } from 'typeorm';
import { PlaylistCreate, PlaylistPatch } from '../dto/base.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  createPlaylist(
    { name, isPublic }: PlaylistCreate,
    userId: string,
  ): Promise<Playlist> {
    return this.playlistRepository.save(
      this.playlistRepository.create({
        name,
        user: {
          id: userId,
        },
      }),
    );
  }

  getPlaylistById(playlistId: string): Promise<Playlist> {
    return this.playlistRepository.findOneBy({
      id: playlistId,
    });
  }

  getPlaylistByName(playlistName: string): Promise<Playlist> {
    return this.playlistRepository.findOneBy({
      name: playlistName,
    });
  }

  getPlaylistByUserId(userId: string): Promise<Playlist[]> {
    return this.playlistRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        playlistSongs: true,
      },
    });
  }

  async patchPlaylistById(
    playlistId: string,
    { name, isPublic }: PlaylistPatch,
  ): Promise<number> {
    const playlistPatched = await this.playlistRepository.update(playlistId, {
      name,
    });

    return playlistPatched.affected;
  }

  deletePlaylistById(playlistId: string): void {
    this.playlistRepository.softDelete(playlistId);
  }
}
