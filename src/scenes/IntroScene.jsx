import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, RefreshCcw, Laptop } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

// Random floating nodes for the "Chaos" state
const CHAOS_NODES = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 600 - 300,
    y: Math.random() * 300 - 150,
}));

// Ordered grid for "Network" state
const NETWORK_NODES = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: (i % 5) * 120 - 240,
    y: Math.floor(i / 5) * 100 - 100,
}));

const IntroScene = ({ onBack }) => {
    const [networkState, setNetworkState] = useState('chaos'); // 'chaos' | 'connecting' | 'connected'

    const toggleNetwork = () => {
        if (networkState === 'chaos') {
            setNetworkState('connecting');
            setTimeout(() => setNetworkState('connected'), 2000);
        } else {
            setNetworkState('chaos');
        }
    };

    // 1. Defined Educational Content (The "Details" the user wants)
    const theoryContent = (
        <>
            <h3 className="text-xl font-bold text-white mb-4">The Birth of the Network</h3>
            <p className="mb-4">
                In the early days of computing, machines were isolated islands. A computer could process data, but it couldn't share it. If you wanted to move a file, you had to physically carry a disk (known as "SneakerNet").
            </p>
            <p className="mb-4">
                This chaos of isolated nodes is inefficient.
            </p>
            <h4 className="font-bold text-white mt-6 mb-2">The Solution: Connection</h4>
            <p className="mb-4">
                By connecting these nodes with a physical medium (copper cables, then fiber, then radio waves), we created a <strong>Network</strong>.
            </p>
            <p className="mb-4">
                A network allows the sharing of resources (printers, storage) and information (data packets). It brings <strong>Order</strong> to the chaos.
            </p>
            <div className="bg-blue-900/20 border-l-2 border-blue-500 p-4 mt-6 text-xs text-blue-200">
                <strong>Key Concept:</strong> A network is two or more computers connected for the purpose of communicating and sharing data.
            </div>
        </>
    );

    // 2. The Interactive Stage
    const visualContent = (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="relative">
                {CHAOS_NODES.map((node, i) => {
                    // Determine target position based on state
                    const target = networkState === 'connected' ? NETWORK_NODES[i] : node;

                    return (
                        <motion.div
                            key={i}
                            initial={{ x: node.x, y: node.y, opacity: 0 }}
                            animate={{
                                x: target.x,
                                y: target.y,
                                opacity: 1,
                                scale: networkState === 'connected' ? 1.2 : 0.8
                            }}
                            transition={{ duration: 2, type: "spring" }}
                            className="absolute z-10"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors duration-1000
                                ${networkState === 'connected' ? 'bg-cyan-500 shadow-[0_0_20px_cyan]' : 'bg-gray-700'}
                            `}>
                                <Laptop size={16} className="text-white" />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Connections Mesh */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none -z-10 overflow-visible">
                    <AnimatePresence>
                        {networkState === 'connected' && (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                            >
                                {NETWORK_NODES.map((n, i) => {
                                    const connections = [];
                                    if ((i + 1) % 5 !== 0) connections.push(NETWORK_NODES[i + 1]);
                                    if (i < 10) connections.push(NETWORK_NODES[i + 5]);

                                    return connections.map((neighbor, idx) => (
                                        <line
                                            key={`${i}-${idx}`}
                                            x1={n.x + 300} y1={n.y + 200}
                                            x2={neighbor.x + 300} y2={neighbor.y + 200}
                                            stroke="rgba(6,182,212,0.3)"
                                            strokeWidth="2"
                                        />
                                    ));
                                })}
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>

                {/* Energy Pulses along lines */}
                {networkState === 'connected' && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
                                animate={{
                                    x: [0, 100, -100, 0],
                                    y: [0, 50, -50, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, delay: i }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // 3. Telemetry / Controls
    const telemetryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="text-xs text-white/40 uppercase block mb-1">Network State</span>
                <span className={`text-xl font-mono font-bold ${networkState === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
                    {networkState.toUpperCase()}
                </span>
            </div>

            <button
                onClick={toggleNetwork}
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2"
            >
                {networkState === 'chaos' ? <><Network size={18} /> CONNECT NODES</> : <><RefreshCcw size={18} /> RESET TO CHAOS</>}
            </button>

            <p className="text-xs text-white/30 text-center leading-relaxed">
                Click the button to simulate the formation of a LAN (Local Area Network), transforming independent workstations into a collaborative system.
            </p>
        </div>
    );

    return (
        <LessonLayout
            title="What is a Network?"
            subtitle="Module 1: From Chaos to Order"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default IntroScene;
