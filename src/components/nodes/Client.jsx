import React from 'react';
import { motion } from 'framer-motion';
import { Laptop } from 'lucide-react';
import { useAntiGravity } from '../../hooks/useAntiGravity';

const Client = ({ position, label = "Client", onClick }) => {
    const { controls } = useAntiGravity({ initialPos: position, isFloating: true });

    return (
        <motion.div
            animate={controls}
            className="absolute flex flex-col items-center cursor-pointer group z-30"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-primary border border-accent-cyan/50 flex items-center justify-center 
          shadow-[0_0_0_1px_rgba(0,243,255,0.1),0_4px_20px_rgba(0,0,0,0.5)] group-hover:border-accent-cyan group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300 relative z-10">
                    <Laptop className="text-accent-cyan w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-green rounded-full border-2 border-[#0a0a0f]" />
            </div>

            <div className="mt-3 text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                {label}
            </div>
        </motion.div>
    );
};

export default Client;
