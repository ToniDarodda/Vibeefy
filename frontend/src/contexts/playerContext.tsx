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

interface S3LinkCache {
  [videoId: string]: string;
}

interface AudioPlayerContextType {
  seek: number;
  isFinish: boolean;
  currentSong?: SongInterface & { link?: string };
  isPlaying: boolean;
  duration?: number;
  pause: () => void;
  reStart: () => void;
  togglePlayPause: () => void;
  setTime: (time: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: SongInterface) => void;
  setCurrentSong: (song: SongInterface) => void;
  playNext: () => void;
  playPrev?: () => void;
}

const defaultValue: AudioPlayerContextType = {
  seek: 0,
  isFinish: true,
  isPlaying: false,
  pause: () => {},
  reStart: () => {},
  togglePlayPause: () => {},
  setTime: () => {},
  setVolume: () => {},
  addToQueue: () => {},
  setCurrentSong: () => {},
  playNext: () => {},
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
  const s3LinkCache: S3LinkCache = {};

  const addToQueue = async (song: SongInterface) => {
    if (!s3LinkCache[song.videoId]) {
      // const { data: s3Link } = useS3Link(song.videoId);

      const link = await linkService.getLinkFromS3(song.videoId);
      s3LinkCache[song.videoId] = link!;
    }

    setQueue((prevQueue) => [
      ...prevQueue,
      { ...song, link: s3LinkCache[song.videoId] },
    ]);
  };

  const playNext = () => {
    setQueue((prevQueue) => {
      const queueCopy = [...prevQueue];
      const nextSong = queueCopy.shift();

      if (nextSong) {
        setCurrentSong(nextSong);
      }

      return queueCopy;
    });
  };

  const playerControls = useAudioPlayer({
    url: currentSong?.link,
    onSongEnd: playNext,
  });

  useEffect(() => {
    const getLink = async () => {
      if (currentSong && !currentSong.link) {
        const fetchLink = async () => {
          // const { data: s3Link } = useS3Link(currentSong.videoId);

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
    setCurrentSong: (song: SongInterface) => setCurrentSong(song),
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = () => useContext(AudioPlayerContext);
