import React, { useState } from 'react';
import { FastForward, Pause, Play, Eye, EyeOff } from 'lucide-react';

const ControlPanel = ({
    isPlaying,
    onTogglePlay,
    speed,
    setSpeed,
    showHeaders,
    onToggleHeaders
}) => {
    return (
        <div className="absolute bottom-12 flex items-center gap-6 px-8 py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full z-50 shadow-2xl">

            {/* Play/Pause */}
            <button
                onClick={onTogglePlay}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all"
            >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>

            {/* Separator */}
            <div className="w-px h-8 bg-white/20" />

            {/* Speed Control */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-white/50 uppercase font-bold tracking-wider">Speed</span>
                <div className="flex bg-white/10 rounded-lg p-1">
                    {[1, 2, 4].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSpeed(s)} // s is multiplier. 1 = normal, 4 = fast
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${speed === s ? 'bg-cyan-500/20 text-cyan-300 shadow-sm' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {s}x
                        </button>
                    ))}
                </div>
            </div>

            {/* Headers Toggle */}
            <button
                onClick={onToggleHeaders}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${showHeaders ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'border-white/10 text-white/40 hover:bg-white/5'
                    }`}
            >
                {showHeaders ? <Eye size={16} /> : <EyeOff size={16} />}
                <span className="text-xs font-bold">Headers</span>
            </button>
        </div>
    );
};

export default ControlPanel;
