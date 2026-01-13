import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { useAntiGravity } from '../../hooks/useAntiGravity';

const Server = ({ position, label = "Server", isTarget = false }) => {
    const { controls } = useAntiGravity({ initialPos: position, isFloating: true });

    return (
        <motion.div
            animate={controls}
            className="absolute flex flex-col items-center z-20"
        >
            <div className="relative">
                {/* Core Halo */}
                <div className="absolute inset-0 -m-4 bg-accent-purple/10 rounded-full blur-md" />

                <div className="w-20 h-20 rounded-full bg-[#0a0a0f] border-2 border-accent-purple flex items-center justify-center 
          shadow-[0_0_30px_rgba(188,19,254,0.1)] relative z-10">
                    <Database className="text-accent-purple w-9 h-9" strokeWidth={1.5} />
                </div>
            </div>

            <div className="mt-4 text-sm font-semibold text-white/90">
                {label}
            </div>
        </motion.div>
    );
};

export default Server;
