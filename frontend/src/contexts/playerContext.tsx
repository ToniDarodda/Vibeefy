import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAudioPlayer } from '../utils/player';
import { SongInterface } from '../interfaces/artist';
import { linkService } from '../services/link';
import { PlaylistSong } from '../interfaces';
import { songService } from '../services/song';

interface S3LinkCache {
  [videoId: string]: string;
}

interface AudioPlayerContextType {
  seek: number;
  isFinish: boolean;
  isPaused: boolean;
  currentSong?: SongInterface & { link?: string };
  isPlaying: boolean;
  duration?: number;
  queue: (SongInterface & {
    link?: string | undefined;
  })[];
  playlistQueue: (SongInterface & {
    link?: string | undefined;
    playlistName?: string | undefined;
  })[];
  pause: () => void;
  reStart: () => void;
  togglePlayPause: () => void;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: (time: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: SongInterface) => void;
  setCurrentSong: (song: SongInterface) => void;
  addPlaylistToQueue: (
    songs: PlaylistSong[] | SongInterface[],
    playlistName: string,
  ) => void;

  playNext: () => void;
  playPrev?: () => void;
}

const defaultValue: AudioPlayerContextType = {
  seek: 0,
  isFinish: true,
  isPlaying: false,
  isPaused: false,
  queue: [],
  playlistQueue: [],
  pause: () => {},
  reStart: () => {},
  togglePlayPause: () => {},
  setTime: () => {},
  setVolume: () => {},
  addToQueue: () => {},
  setCurrentSong: () => {},
  addPlaylistToQueue: () => {},
  playNext: () => {},
  setIsPaused: () => {},
};

const AudioPlayerContext = createContext<AudioPlayerContextType>(defaultValue);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<
    SongInterface & { link?: string }
  >();
  const [queue, setQueue] = useState<(SongInterface & { link?: string })[]>([]);
  const [playlistQueue, setPlaylistQueue] = useState<
    (SongInterface & { link?: string; playlistName?: string })[]
  >([]);

  const s3LinkCache: S3LinkCache = {};

  const addToQueue = async (song: SongInterface) => {
    if (!s3LinkCache[song.videoId]) {
      const link = await linkService.getLinkFromS3(song.videoId);
      s3LinkCache[song.videoId] = link!;
    }

    setQueue((prevQueue) => [
      ...prevQueue,
      { ...song, link: s3LinkCache[song.videoId] },
    ]);
  };

  const addPlaylistToQueue = async (
    songs: PlaylistSong[] | SongInterface[],
    playlistName?: string,
  ) => {
    const results = await Promise.all(
      songs.map(async (song: PlaylistSong | SongInterface) => {
        let realSong;
        if ('songId' in song) {
          realSong = await songService.getPlaylist(song.songId);
        } else {
          realSong = song;
        }

        if (!s3LinkCache[realSong.videoId]) {
          const link = await linkService.getLinkFromS3(realSong.videoId);
          s3LinkCache[realSong.videoId] = link;
        }

        return {
          ...realSong,
          albumName: playlistName,
          link: s3LinkCache[realSong.videoId],
        };
      }),
    );

    setPlaylistQueue(results);
  };

  const playNext = () => {
    if (queue.length > 0) {
      const [nextSong, ...remainingQueue] = queue;

      setCurrentSong(nextSong);
      setQueue(remainingQueue);
    } else if (playlistQueue.length > 0) {
      const [nextSong, ...remainingPlaylistQueue] = playlistQueue;

      setCurrentSong(nextSong);
      setPlaylistQueue(remainingPlaylistQueue);
    }
  };

  const playerControls = useAudioPlayer({
    url: currentSong?.link,
    onSongEnd: playNext,
  });

  useEffect(() => {
    const getLink = async () => {
      if (currentSong && !currentSong.link) {
        const fetchLink = async () => {
          const link = await linkService.getLinkFromS3(currentSong.videoId);

          setCurrentSong({ ...currentSong, link });
        };
        fetchLink();
      }
    };
    getLink();
  }, [currentSong]);

  const value = {
    ...playerControls,
    queue,
    playNext,
    addToQueue,
    currentSong,
    addPlaylistToQueue,
    setPlaylistQueue,
    playlistQueue,
    setCurrentSong: (song: SongInterface) => setCurrentSong(song),
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = () => useContext(AudioPlayerContext);
