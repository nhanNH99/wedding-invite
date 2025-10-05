"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Auto-play on component mount and user interaction
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    const playAudio = async () => {
      if (audioRef.current && !hasInteracted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (error) {
          console.log("Waiting for user interaction to play music");
        }
      }
    };

    // Try auto-play immediately
    setTimeout(playAudio, 500);

    // Auto-play on any user interaction
    const handleInteraction = () => {
      if (!hasInteracted) {
        playAudio();
        setHasInteracted(true);
      }
    };

    // Listen to multiple interaction events
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("scroll", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlayClick = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (error) {
          console.log("Play error:", error);
        }
      }
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/Ngày Đầu Tiên.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Player Button - Fixed position */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-40"
      >
        <div className="relative">
          {/* Volume Control - Shows on hover */}
          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 mb-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 w-40"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-700"
                  />
                </div>
                <p className="text-xs text-gray-600 text-center mt-1">
                  {Math.round(volume * 100)}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
            className="group relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300 cursor-pointer"
            aria-label={isPlaying ? "Music playing" : "Click to play music"}
          >
            {/* Animated rings when playing */}
            {isPlaying && (
              <>
                <span className="absolute inset-0 rounded-full bg-gray-400 animate-ping opacity-20"></span>
                <span className="absolute inset-0 rounded-full bg-gray-400 animate-pulse opacity-30"></span>
              </>
            )}

            {/* Music icon */}
            <div className="relative z-10">
              {isPlaying ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Song name tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
              <span className="font-medium">
                {isPlaying ? "🎵 Ngày Đầu Tiên" : "▶️ Bấm để phát nhạc"}
              </span>
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          </button>

          {/* Music note animation when playing */}
          {isPlaying && (
            <motion.div
              animate={{
                y: [-20, -40],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="absolute -top-2 -right-2 text-gray-600 text-xl pointer-events-none"
            >
              ♪
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
