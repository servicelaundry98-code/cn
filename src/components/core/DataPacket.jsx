import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAntiGravity } from '../../hooks/useAntiGravity';
import { FileText, Box, Globe, Binary, Zap } from 'lucide-react';

const DataPacket = ({ id, startPos, targetPos, onReachDestination, type = 'TCP', activeLayer = 'physical', label, delay = 0 }) => {
    const { controls, moveTo } = useAntiGravity({ initialPos: startPos || { x: 0, y: 0 } });

    useEffect(() => {
        if (targetPos) {
            const timer = setTimeout(() => {
                moveTo(targetPos, 1.5).then(() => {
                    if (onReachDestination) onReachDestination(id);
                });
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [targetPos, moveTo, id, onReachDestination, delay]);

    const getLayerVisuals = () => {
        switch (activeLayer) {
            case 'app':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-lg backdrop-blur-sm">
                        <FileText size={14} className="text-blue-300" />
                        <span className="text-[10px] font-mono text-blue-200">HTTP/GET</span>
                    </div>
                );
            case 'transport':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-lg backdrop-blur-sm">
                        <Box size={14} className="text-purple-300" />
                        <span className="text-[10px] font-mono text-purple-200">TCP:SYN</span>
                    </div>
                );
            case 'network':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400 rounded-lg backdrop-blur-sm">
                        <Globe size={14} className="text-green-300" />
                        <span className="text-[10px] font-mono text-green-200">IP Pkt</span>
                    </div>
                );
            case 'datalink':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-400 rounded-lg backdrop-blur-sm">
                        <Binary size={14} className="text-orange-300" />
                        <span className="text-[10px] font-mono text-orange-200">Frame</span>
                    </div>
                );
            default: // physical
                return (
                    <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] border-2 border-white flex items-center justify-center">
                        <Zap size={8} className="text-black" fill="currentColor" />
                    </div>
                );
        }
    };

    return (
        <motion.div
            animate={controls}
            initial={{ x: startPos?.x || 0, y: startPos?.y || 0, scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute z-50 pointer-events-none"
        >
            {getLayerVisuals()}
            {label && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded whitespace-nowrap border border-white/20">
                    {label}
                </div>
            )}
        </motion.div>
    );
};

export default DataPacket;
