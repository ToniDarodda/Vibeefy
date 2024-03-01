import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface UseAudioPlayerOptions {
  url: string;
}

export const useAudioPlayer = ({ url }: UseAudioPlayerOptions) => {
  const playerRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.unload();
    }
    const howlPlayer = new Howl({
      src: [url],
      format: ['mp3'],
      autoplay: true,
      loop: false,
      html5: true,
      preload: true,
      onplay: () => {
        setIsPlaying(true);
        setDuration(howlPlayer.duration());
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
    });

    playerRef.current = howlPlayer;

    playerRef.current.play();
  }, [url]);

  const pause = () => {
    playerRef.current?.pause();
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      isPlaying ? playerRef.current.pause() : playerRef.current.play();
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
    isPlaying,
    setVolume,
    setDuration,
    togglePlayPause,
    reStart: reStart,
  };
};
