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
    audio.preload = 'auto';
    audio.volume = options.volume ?? 0.5;
    audio.loop = options.loop ?? false;

    const markLoaded = () => setIsLoaded(true);
    const onError = () => {
      console.warn(`Failed to load audio: ${soundPath}`);
      setIsLoaded(false);
    };

    audio.addEventListener('loadedmetadata', markLoaded);
    audio.addEventListener('canplay', markLoaded);
    audio.addEventListener('canplaythrough', markLoaded);
    audio.addEventListener('error', onError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', markLoaded);
      audio.removeEventListener('canplay', markLoaded);
      audio.removeEventListener('canplaythrough', markLoaded);
      audio.removeEventListener('error', onError);
    };
  }, [soundPath, options.volume, options.loop]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
    } catch {}
    audio.play().catch(() => {
      // Ignore errors from browsers that require user interaction first
    });
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
