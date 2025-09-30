import { useRef, useEffect, useState } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = (soundPath: string, options: SoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(soundPath);
    audio.volume = options.volume ?? 0.5;
    audio.loop = options.loop ?? false;
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });
    
    audio.addEventListener('error', () => {
      console.warn(`Failed to load audio: ${soundPath}`);
      setIsLoaded(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [soundPath, options.volume, options.loop]);

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore errors from browsers that require user interaction first
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return { play, stop, pause, setVolume, isLoaded };
};

export default useSound;
