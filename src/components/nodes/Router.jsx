import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { useAntiGravity } from '../../hooks/useAntiGravity';

const Router = ({ position, label = "Router" }) => {
    const { controls } = useAntiGravity({ initialPos: position, isFloating: true });

    return (
        <motion.div
            animate={controls}
            className="absolute flex flex-col items-center z-20"
        >
            <div className="relative flex items-center justify-center">
                {/* Tech Ring */}
                <div className="absolute w-24 h-24 border border-accent-green/20 rounded-full" />
                <div className="absolute w-[100px] h-[100px] border border-accent-green/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />

                <div className="w-16 h-16 rounded-full bg-[#0a0a0f] border border-accent-green/50 flex items-center justify-center 
                shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-10">
                    <Network className="text-accent-green w-8 h-8" strokeWidth={1.5} />
                </div>
            </div>

            <div className="mt-4 text-xs font-mono text-accent-green bg-accent-green/5 px-2 py-1 rounded border border-accent-green/20">
                {label}
            </div>
        </motion.div>
    );
};

export default Router;
