"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Disc3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
  { id: 0, title: "Drake - One Dance", src: "/drake-one-dance.m4a" },
  { id: 1, title: "The Weeknd - Blinding Lights", src: "/song2.m4a" },
  { id: 2, title: "Hans Zimmer - Interstellar", src: "/song3.m4a" },
  { id: 3, title: "Joji - Glimpse of Us", src: "/song4.m4a" },
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockAttempted = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    const unlockAudio = () => {
      if (unlockAttempted.current) return;
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          unlockAttempted.current = true;
          // Clean up listeners
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('keydown', unlockAudio);
          window.removeEventListener('scroll', unlockAudio);
        }).catch(() => {
          // Still blocked
        });
      }
    };

    // Aggressively listen for any user interaction to unlock audio
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('scroll', unlockAudio, { passive: true });

    // Try to play immediately on mount
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        unlockAttempted.current = true;
      }).catch((e) => {
        console.warn("Autoplay blocked by browser. Waiting for interaction.", e);
      });
    }

    const handleChapterChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ chapter: number }>;
      const newIndex = customEvent.detail.chapter % PLAYLIST.length;
      
      if (newIndex !== trackIndex) {
        setTrackIndex(newIndex);
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      }
    };

    window.addEventListener("chapterChange", handleChapterChange);

    return () => {
      window.removeEventListener("chapterChange", handleChapterChange);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };
  }, [trackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      unlockAttempted.current = true;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentTrack = PLAYLIST[trackIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 shadow-2xl">
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }} 
      />
      
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white overflow-hidden shrink-0">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-full flex items-center justify-center bg-brand-primary/20"
        >
          <Disc3 className="w-4 h-4 text-brand-primary" />
        </motion.div>
      </div>
      
      <div className="flex flex-col min-w-[120px]">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400">Now Playing</span>
        <motion.span 
          key={currentTrack.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium text-white truncate max-w-[150px]"
        >
          {currentTrack.title}
        </motion.span>
      </div>

      <div className="h-6 w-px bg-white/20 mx-2 shrink-0"></div>

      <button 
        onClick={togglePlay}
        className="text-white hover:text-zinc-300 transition-colors shrink-0"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <button 
        onClick={toggleMute}
        className="text-white hover:text-zinc-300 transition-colors shrink-0"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
