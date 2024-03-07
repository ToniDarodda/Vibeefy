import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface UseAudioPlayerOptions {
  url: string | undefined;
  onSongEnd: () => void;
}

export const useAudioPlayer = ({ url, onSongEnd }: UseAudioPlayerOptions) => {
  const playerRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinish, setIsFinish] = useState(true);
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.unload();
    }
    if (url === undefined) return;
    const howlPlayer = new Howl({
      src: [url],
      format: ['wav'],
      autoplay: false,
      loop: false,
      html5: true,
      preload: true,
      onplay: () => {
        setIsPlaying(true);
        setIsFinish(false);
        setDuration(howlPlayer.duration());
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        setIsFinish(true);
        onSongEnd();
      },
    });

    playerRef.current = howlPlayer;

    playerRef.current.play();
  }, [url]);

  const pause = () => {
    playerRef.current?.pause();
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  const setVolume = (volume: number) => {
    playerRef.current?.volume(volume / 100);
  };

  const reStart = () => {
    if (playerRef.current) {
      playerRef.current.stop();
      playerRef.current.play();
      setSeek(0);
    }
  };

  const setTime = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seek(time);
      setSeek(time);
    }
  };

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      const intervalId = setInterval(() => {
        const currentTime = playerRef.current?.seek();
        if (typeof currentTime === 'number') {
          setSeek(currentTime);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

  return {
    seek,
    pause,
    setTime,
    duration,
    isFinish,
    isPlaying,
    setVolume,
    setDuration,
    togglePlayPause,
    reStart: reStart,
  };
};
