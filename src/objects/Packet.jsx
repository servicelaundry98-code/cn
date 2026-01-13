import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lock, Link, Box, Globe, Binary, Zap } from 'lucide-react';

export const OsiPacket = ({ layer, phase, encapsulationLevel, showHeaders }) => {
    // Visual changes based on Layer
    const getIcon = () => {
        switch (layer) {
            case 7: return <FileText size={20} />;
            case 6: return <Lock size={20} />;
            case 5: return <Link size={20} />;
            case 4: return <Box size={20} />;
            case 3: return <Globe size={20} />;
            case 2: return <Binary size={20} />;
            case 1: return <Zap size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const getWrapperStyle = (level) => {
        // As we go down (level increases), we add more "shells"
        // This visualizes encapsulation
        let size = 40 + (level * 10);
        let opacity = 1 - (level * 0.1);
        return {
            width: size,
            height: size,
            zIndex: 10 - level
        };
    };

    return (
        <motion.div
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative flex items-center justify-center"
        >
            {/* Core Data (The 'Soul') */}
            <div className="absolute z-50 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_15px_white]">
                {getIcon()}
            </div>

            {/* Encapsulation Layers (Rings) */}
            {[...Array(encapsulationLevel)].map((_, i) => {
                // Label Logic: 
                // Ring 0 (innermost) -> L7 ? No, Encapsulation adds outwards.
                // 1 ring means Layer 7 added header? Wait.
                // L7 (App) -> 1 Ring (L7 Header)
                // L6 -> 2 Rings (L7 + L6)
                // So the *newest* ring is the outer most?
                // Actually, standard encap: Data is center. L7 header wraps it. L6 header wraps L7...
                // So inner-most ring is L7. Outer-most is L1.
                // i=0 is inner-most.

                const labels = ['App', 'Pres', 'Sess', 'TCP', 'IP', 'Eth', 'Phy'];
                // We have 7 layers. 
                // If encapsulationLevel is 1, we show labels[0].
                // If 7, we show labels[0]..labels[6].

                // Correction: encapsulationLevel = 8 - layerId.
                // Layer 7 (App) -> encapLevel 1. Should show 'App' header? 
                // Layer 1 (Phy) -> encapLevel 7. Should show all.

                // Let's just map index to label for simplicity of demo
                const label = labels[i] || '';

                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{ delay: i * 0.1 }}
                        className="absolute rounded-full border-2 border-cyan-400 flex items-start justify-center"
                        style={{
                            width: 40 + ((i + 1) * 16),
                            height: 40 + ((i + 1) * 16),
                            borderColor: `hsl(${200 + (i * 20)}, 100%, 50%)`
                        }}
                    >
                        {showHeaders && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -top-3 text-[8px] font-mono bg-black text-white px-1 rounded shadow-sm"
                                style={{ color: `hsl(${200 + (i * 20)}, 100%, 70%)` }}
                            >
                                {label}
                            </motion.span>
                        )}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};
