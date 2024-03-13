import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';

interface UseAudioPlayerOptions {
  url: string | undefined;
  onSongEnd: () => void;
}

export const useAudioPlayer = ({ url, onSongEnd }: UseAudioPlayerOptions) => {
  const playerRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
      onload: () => {
        setDuration(howlPlayer.duration());
      },
      onplay: () => {
        setIsPlaying(true);
        setIsFinish(false);
        setIsPaused(false);
      },
      onpause: () => {
        setIsPlaying(false);
        setIsPaused(true);
      },
      onstop: () => setIsPlaying(false),
      onend: () => {
        setIsFinish(true);
        setIsPlaying(false);
        onSongEnd();
      },
    });

    playerRef.current = howlPlayer;

    playerRef.current.play();
  }, [url]);

  const pause = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  }, [isPlaying]);

  const setVolume = useCallback((volume: number) => {
    playerRef.current?.volume(volume / 100);
  }, []);

  const reStart = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.stop();
      playerRef.current.play();
      setSeek(0);
    }
  }, []);

  const setTime = useCallback((time: number) => {
    if (playerRef.current) {
      playerRef.current.seek(time);
      setSeek(time);
    }
  }, []);

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
    isPaused,
    duration,
    isFinish,
    isPlaying,
    setVolume,
    setIsPaused,
    setDuration,
    togglePlayPause,
    reStart: reStart,
  };
};
