import React from 'react';

const NetworkWorld = ({ children, activeLayer = 'physical' }) => {
    return (
        <div className="relative w-full h-screen bg-[#050510] overflow-hidden font-inter text-white selection:bg-cyan-500/30">

            {/* 1. Deep Background Base */}
            <div className="absolute inset-0 bg-[#050510]" />

            {/* 2. Very Subtle Radial Gradient for Central Focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)]" />

            {/* 3. Clean Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(${activeLayer === 'app' ? '#60a5fa' :
                            activeLayer === 'transport' ? '#a855f7' :
                                activeLayer === 'network' ? '#22c55e' :
                                    activeLayer === 'datalink' ? '#f97316' :
                                        '#fff'
                        } 1px, transparent 1px), linear-gradient(90deg, ${activeLayer === 'app' ? '#60a5fa' :
                            activeLayer === 'transport' ? '#a855f7' :
                                activeLayer === 'network' ? '#22c55e' :
                                    activeLayer === 'datalink' ? '#f97316' :
                                        '#fff'
                        } 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* 4. Ambient Bottom Glow (Grounding) */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default NetworkWorld;
