import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Share2, Network } from 'lucide-react';

const DevicePacket = ({ targetId, startId, pathType, onComplete }) => {
    // pathType: 'broadcast' (messy), 'direct' (clean)

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
                // Simple animation for demo: expand outward or move to target
                // For Hub: Expand ring?
                x: pathType === 'broadcast' ? [0, 50, 60] : [0, 100],
                y: pathType === 'broadcast' ? [0, 50, 60] : 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
            className={`absolute z-20 w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]
                ${pathType === 'broadcast' ? 'text-red-400 bg-red-500' : 'text-cyan-400 bg-cyan-500'}
            `}
        />
    );
};

const NetworkDevice = ({ type, isSelected, onClick }) => {
    const Icon = type.icon;

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            className={`cursor-pointer flex flex-col items-center gap-3 p-4 rounded-xl border backdrop-blur-md transition-all
                ${isSelected
                    ? 'bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'bg-black/20 border-white/5 opacity-60 hover:opacity-100'
                }
            `}
        >
            <div
                className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: `${type.color}20`, border: `2px solid ${type.color}` }}
            >
                <Icon size={32} color={type.color} />

                {/* Internal Energy Pulse */}
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: type.color }}
                    />
                )}
            </div>

            <div className="text-center">
                <h3 className="font-bold text-sm" style={{ color: type.color }}>{type.name}</h3>
                <span className="text-[10px] text-white/50 uppercase tracking-widest">{type.metaphor}</span>
            </div>
        </motion.div>
    );
};

export default NetworkDevice;
