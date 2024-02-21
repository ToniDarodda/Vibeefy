import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LovedSong, LovedSongToSong } from 'src/entities/lovedSong/entity';
import { Repository } from 'typeorm';
import { LovedSongCreate } from '../dto/base.dto';

@Injectable()
export class LovedSongService {
  constructor(
    @InjectRepository(LovedSong)
    private readonly lovedSongRepository: Repository<LovedSong>,
    @InjectRepository(LovedSongToSong)
    private readonly lovedSongToSongRepository: Repository<LovedSongToSong>,
  ) {}

  async createLovedSong(
    { isPublic }: LovedSongCreate,
    songId: string,
    userId: string,
  ): Promise<LovedSong> {
    const lovedSongCreated = await this.lovedSongRepository.save(
      this.lovedSongRepository.create({
        public: isPublic,
        user: {
          id: userId,
        },
      }),
    );

    this.lovedSongToSongRepository.save(
      this.lovedSongToSongRepository.create({
        songId,
        lovedSong: {
          id: lovedSongCreated.id,
        },
      }),
    );

    return lovedSongCreated;
  }

  getLovedSong(userId: string): Promise<LovedSong[]> {
    return this.lovedSongRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async deleteLovedSong(songId: string): Promise<void> {
    await this.lovedSongToSongRepository.delete({
      songId,
    });
  }
}
