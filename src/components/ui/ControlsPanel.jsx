import React from 'react';
import { Play, Pause, RefreshCw, Zap, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

const ControlsPanel = ({
    onSendPacket,
    onTogglePause,
    isPaused,
    onReset,
    packetLossMode,
    setPacketLossMode
}) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-[#0f1115] border border-white/10 rounded-lg shadow-2xl z-50 ring-1 ring-black/50"
        >
            <button
                onClick={onSendPacket}
                className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-black font-semibold rounded-md hover:bg-[#00d0db] transition-colors text-sm"
            >
                <Zap size={16} fill="currentColor" />
                <span>Send Data</span>
            </button>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <button
                onClick={onTogglePause}
                className={`p-2 rounded-md transition-colors ${isPaused ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                title={isPaused ? "Resume" : "Pause"}
            >
                {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            </button>

            <button
                onClick={onReset}
                className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-md transition-colors"
                title="Reset Simulation"
            >
                <RefreshCw size={18} />
            </button>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <button
                onClick={() => setPacketLossMode(!packetLossMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${packetLossMode
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
            >
                <WifiOff size={16} />
                <span>Packet Loss: {packetLossMode ? 'ON' : 'OFF'}</span>
            </button>
        </motion.div>
    );
};

export default ControlsPanel;
