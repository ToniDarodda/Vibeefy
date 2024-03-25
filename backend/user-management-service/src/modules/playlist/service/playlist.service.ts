import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  PlaylistCreate,
  PlaylistPatch,
  PlaylistSongCreate,
} from '../dto/base.dto';
import { ArtistManagerService } from 'src/modules/artist-manager/service/artist-manager.service';
import ShortUniqueId from 'short-unique-id';
import { User } from 'src/entities/user/entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(PlaylistSong)
    private readonly playlistSongRepository: Repository<PlaylistSong>,
    private readonly artistManagerRepostory: ArtistManagerService,
  ) {}

  async createPlaylist(
    { name, isPublic }: PlaylistCreate,
    userId: string,
  ): Promise<Playlist> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return this.playlistRepository.save(
      this.playlistRepository.create({
        name,
        isPublic,
        user,
      }),
    );
  }

  async generateSharablePlaylistCode(
    userId: string,
    playlistId: string,
  ): Promise<string> {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, user: { id: userId } },
    });

    if (playlist.shareCode !== null) return playlist.shareCode;

    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const sharableCode = randomUUID();

    await this.playlistRepository.update(playlistId, {
      user: {
        id: userId,
      },
      shareCode: sharableCode,
    });

    return sharableCode;
  }

  async useGeneratedPlaylistCode(code: string, userId: string): Promise<void> {
    try {
      const playlistToShare = await this.playlistRepository.findOne({
        where: {
          shareCode: code,
        },
      });

      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (playlistToShare.sharedToUser === undefined) {
        playlistToShare.sharedToUser = [];
        await this.playlistRepository.save(playlistToShare);
      }

      if (playlistToShare && user) {
        playlistToShare.sharedToUser.push(user);
        await this.playlistRepository.save(playlistToShare);
      }
    } catch (err) {
      throw new HttpException(
        'No playlist found with this code',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async makePlaylistPublic(
    userId: string,
    playlistId: string,
  ): Promise<UpdateResult> {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, user: { id: userId } },
      relations: {
        user: true,
        sharedToUser: true,
      },
    });

    if (!playlist || playlist === undefined || playlist === null)
      throw new HttpException(
        'You are not the owner of the playlist',
        HttpStatus.BAD_REQUEST,
      );

    return this.playlistRepository.update(playlistId, {
      user: {
        id: userId,
      },
      isPublic: true,
    });
  }

  getPublicPlaylist(): Promise<Playlist[]> {
    return this.playlistRepository.find({
      where: {
        isPublic: true,
      },
    });
  }

  getPlaylistById(playlistId: string): Promise<Playlist> {
    return this.playlistRepository.findOne({
      where: {
        id: playlistId,
      },
      relations: {
        playlistSongs: true,
        user: true,
      },
    });
  }

  getPlaylistByName(playlistName: string): Promise<Playlist> {
    return this.playlistRepository.findOneBy({
      name: playlistName,
    });
  }

  async getPlaylistByUserId(userId: string): Promise<Playlist[]> {
    const queryBuilder = this.playlistRepository.createQueryBuilder('playlist');

    queryBuilder.leftJoinAndSelect(
      'playlist.user',
      'user',
      'user.id = :userId',
      { userId },
    );

    queryBuilder.leftJoinAndSelect('playlist.sharedToUser', 'sharedUser');

    queryBuilder.leftJoinAndSelect('playlist.playlistSongs', 'playlistSong');

    queryBuilder.where('user.id = :userId OR sharedUser.id = :userId', {
      userId,
    });

    const playlists = await queryBuilder.getMany();

    return playlists;
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
