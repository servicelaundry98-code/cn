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
                By connecting these nodes with a physical medium (copper cables, fiber optic, or wireless signals), we created a <strong>Network</strong>.
            </p>
            <div className="bg-blue-900/20 border-l-2 border-blue-500 p-4 mt-4 text-xs text-blue-200">
                <strong>Definition:</strong> A computer network is a group of connected devices that communicate with each other to share data and resources.
            </div>

            <h4 className="font-bold text-white mt-6 mb-3">📚 Basic Terminologies</h4>
            <div className="space-y-2 text-sm">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <strong className="text-cyan-400">Node:</strong> Any device that can send, receive, or forward data (laptops, servers, printers, routers).
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <strong className="text-cyan-400">Link:</strong> The physical or wireless medium connecting nodes (Ethernet cables, Wi-Fi, Bluetooth).
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <strong className="text-cyan-400">Protocol:</strong> Rules that govern how data is sent and received (TCP/IP, HTTP, DNS).
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <strong className="text-cyan-400">IP Address:</strong> Unique identifier for each device on a network (e.g., 192.168.1.1).
                </div>
            </div>

            <h4 className="font-bold text-white mt-6 mb-3">🏗️ Network Architecture Types</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg">
                    <strong className="text-purple-300 block mb-1">Client-Server</strong>
                    <p className="text-white/60">Central server manages client requests. Example: Web servers, email servers.</p>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-lg">
                    <strong className="text-green-300 block mb-1">Peer-to-Peer (P2P)</strong>
                    <p className="text-white/60">No central server. Each device acts as both client and server. Example: BitTorrent.</p>
                </div>
            </div>

            <h4 className="font-bold text-white mt-6 mb-3">🎯 Goals of Networks</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-white/70">
                <li><strong>Resource Sharing:</strong> Share hardware (printers, storage) efficiently</li>
                <li><strong>Reliability:</strong> Backup systems and fault tolerance</li>
                <li><strong>Scalability:</strong> Easy to add more devices and users</li>
                <li><strong>Security:</strong> Protect data from unauthorized access</li>
                <li><strong>Cost Efficiency:</strong> Reduce hardware duplication</li>
            </ul>

            <h4 className="font-bold text-white mt-6 mb-3">💡 Real-World Uses</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 p-2 rounded">📧 Email & Communication</div>
                <div className="bg-white/5 p-2 rounded">🌐 Internet Access</div>
                <div className="bg-white/5 p-2 rounded">📁 File Sharing</div>
                <div className="bg-white/5 p-2 rounded">🎓 Online Education</div>
                <div className="bg-white/5 p-2 rounded">🛒 E-commerce</div>
                <div className="bg-white/5 p-2 rounded">🎮 Online Gaming</div>
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

            {/* Network Statistics */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-xs text-white/40 block mb-1">Total Nodes</span>
                    <span className="text-lg font-bold text-cyan-400">{CHAOS_NODES.length}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-xs text-white/40 block mb-1">Connections</span>
                    <span className="text-lg font-bold text-cyan-400">
                        {networkState === 'connected' ? '24' : '0'}
                    </span>
                </div>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-xs text-white/40 block mb-1">Network Type</span>
                <span className="text-sm font-bold text-white">
                    {networkState === 'connected' ? 'LAN (Local Area Network)' : 'Isolated Nodes'}
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
