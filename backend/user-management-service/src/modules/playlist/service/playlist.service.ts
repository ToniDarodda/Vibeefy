import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import { Repository } from 'typeorm';
import {
  PlaylistCreate,
  PlaylistPatch,
  PlaylistSongCreate,
} from '../dto/base.dto';
import { ArtistManagerService } from 'src/modules/artist-manager/service/artist-manager.service';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(PlaylistSong)
    private readonly playlistSongRepository: Repository<PlaylistSong>,
    private readonly artistManagerRepostory: ArtistManagerService,
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

  async deletePlaylistById(playlistId: string): Promise<void> {
    await this.playlistRepository.softDelete(playlistId);
  }

  async addSongToPlaylist(
    playlistId: string,
    { name, songId, songDuration }: PlaylistSongCreate,
  ): Promise<PlaylistSong> {
    await this.getPlaylistById(playlistId);

    const playlistSong = await this.playlistSongRepository.save(
      this.playlistSongRepository.create({
        songName: name,
        songId,
        songDuration,
        playlist: {
          id: playlistId,
        },
      }),
    );

    return playlistSong;
  }

  async addAlbumToPlaylist(
    albumId: string,
    playlistId: string,
  ): Promise<PlaylistSong[]> {
    const playListSong = await this.artistManagerRepostory.getSongsInfo(
      albumId,
    );

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
    await this.playlistSongRepository.delete({
      playlist: {
        id: playlistId,
      },
      songId: songId,
    });
  }
}
