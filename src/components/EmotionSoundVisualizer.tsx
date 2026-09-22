import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export const EmotionSoundVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      audioEngine.playChime();
    } else {
      audioEngine.playClick();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      onMouseEnter={() => audioEngine.playHover()}
      aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-current/20 hover:border-current/60 transition-all duration-300 text-xs font-mono select-none"
    >
      {/* Dynamic Animated Equalizer Bars */}
      <div className="flex items-end gap-[3px] h-3.5 w-4 justify-center">
        <span
          className={`w-[2px] bg-current rounded-full transition-all ${
            isPlaying ? 'animate-sound-1 h-3' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current rounded-full transition-all ${
            isPlaying ? 'animate-sound-2 h-3.5' : 'h-2 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current rounded-full transition-all ${
            isPlaying ? 'animate-sound-3 h-2' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current rounded-full transition-all ${
            isPlaying ? 'animate-sound-4 h-3' : 'h-1.5 opacity-40'
          }`}
        />
      </div>

      <span className="hidden sm:inline-block text-[11px] font-medium uppercase tracking-wider opacity-75 group-hover:opacity-100">
        {isPlaying ? 'Sound On' : 'Sound'}
      </span>
    </button>
  );
};
