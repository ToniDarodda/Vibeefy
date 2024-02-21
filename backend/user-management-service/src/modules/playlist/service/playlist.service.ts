import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import { Repository } from 'typeorm';
import {
  PlaylistCreate,
  PlaylistPatch,
  PlaylistSongCreate,
} from '../dto/base.dto';
import { ArtistService } from 'src/app.service';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(PlaylistSong)
    private readonly playlistSongRepository: Repository<PlaylistSong>,
    private readonly artistService: ArtistService,
  ) {}

  createPlaylist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    return this.playlistRepository.findOne({
      where: {
        id: playlistId,
      },
      relations: {
        playlistSongs: true,
      },
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  async addSongToPlaylist(
    playlistId: string,
    data: PlaylistSongCreate,
  ): Promise<PlaylistSong> {
    return this.playlistSongRepository.save(
      this.playlistSongRepository.create({
        ...data,
        playlist: {
          id: playlistId,
        },
      }),
    );
  }

  async addAlbumToPlaylist(
    albumId: string,
    playlistId: string,
  ): Promise<PlaylistSong[]> {
    const playListSong = await this.artistService.getSongsInfo(albumId);

    await this.getPlaylistById(playlistId);

    const addedPlaylistResult = Promise.all(
      playListSong.map((song: any) => {
        return this.playlistSongRepository.save(
          this.playlistSongRepository.create({
            playlist: {
              id: playlistId,
            },
            songId: song.id,
          }),
        );
      }),
    );

    return addedPlaylistResult;
  }

  async deleteSongFromPlaylist(
    playlistId: string,
    songId: string,
  ): Promise<void> {
    this.playlistSongRepository.delete({
      playlist: {
        id: playlistId,
      },
      songId: songId,
    });
  }
}
