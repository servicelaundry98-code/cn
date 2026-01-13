import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NetworkWorld from '../components/core/NetworkWorld';
import Client from '../components/nodes/Client';
import Server from '../components/nodes/Server';
import Router from '../components/nodes/Router';
import DataPacket from '../components/core/DataPacket';
import ControlsPanel from '../components/ui/ControlsPanel';
import LayerSwitcher from '../components/ui/LayerSwitcher';
import { useNetworkSimulation } from '../hooks/useNetworkSimulation';
import { Share2, FileSpreadsheet, Activity } from 'lucide-react';

const MainScene = () => {
    const [activeLayer, setActiveLayer] = useState('physical');
    const [packetLossMode, setPacketLossMode] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Dynamic positioning state
    const [positions, setPositions] = useState({
        client: { x: 100, y: 500 },
        router1: { x: 400, y: 300 },
        router2: { x: 600, y: 400 },
        server: { x: 800, y: 100 },
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setPositions({
                client: { x: width * 0.15, y: height * 0.7 },
                router1: { x: width * 0.45, y: height * 0.45 },
                router2: { x: width * 0.55, y: height * 0.6 },
                server: { x: width * 0.85, y: height * 0.2 },
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const {
        packets,
        setPackets,
        message,
        simulationMode,
        setSimulationMode,
        sendPacket,
        handlePacketArrival,
        tcpState,
        routerStatus,
        toggleRouter
    } = useNetworkSimulation(positions);

    const handleReset = () => {
        setPackets([]);
    };

    return (
        <NetworkWorld activeLayer={activeLayer}>
            <Client position={positions.client} label="User Device" onClick={sendPacket} />

            {/* MAIN ROUTER (Router 1) - Clickable to Fail */}
            <div onClick={() => toggleRouter('router1')} className="cursor-pointer relative z-50">
                <Router position={positions.router1} label="Primary Router" />
                {/* Failure indicator overlay */}
                {routerStatus.router1 === 'failed' && (
                    <div className="absolute left-[400px] top-[300px] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <div className="text-4xl animate-pulse">❌</div>
                    </div>
                )}
            </div>

            {/* BACKUP ROUTER (Router 2) */}
            <Router position={positions.router2} label="Backup Router" />

            <Server
                position={positions.server}
                label={tcpState === 'ESTABLISHED' ? "Server (Connected)" : "Google Server"}
                isTarget
            />

            {/* Mode Selectors */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
                <button
                    onClick={() => setSimulationMode('simple')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${simulationMode === 'simple' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100' : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                >
                    <Activity size={16} />
                    <span className="text-sm font-medium">Simple</span>
                </button>
                <button
                    onClick={() => setSimulationMode('tcp')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${simulationMode === 'tcp' ? 'bg-purple-500/20 border-purple-400 text-purple-100' : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                >
                    <Share2 size={16} />
                    <span className="text-sm font-medium">TCP Handshake</span>
                </button>
                <button
                    onClick={() => setSimulationMode('fragmentation')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${simulationMode === 'fragmentation' ? 'bg-orange-500/20 border-orange-400 text-orange-100' : 'bg-black/40 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                >
                    <FileSpreadsheet size={16} />
                    <span className="text-sm font-medium">Fragmentation</span>
                </button>
            </div>

            {/* Visual Connections */}
            <svg className="absolute inset-0 pointer-events-none z-0">
                {/* PRIMARY PATH: Client -> Router 1 */}
                <motion.path
                    d={`M${positions.client.x + 32} ${positions.client.y} Q ${positions.router1.x} ${positions.router1.y + 100} ${positions.router1.x} ${positions.router1.y + 32}`}
                    stroke={routerStatus.router1 === 'failed' ? '#ef4444' : '#00f3ff'}
                    strokeWidth={routerStatus.router1 === 'failed' ? "1" : "2"}
                    fill="none"
                    strokeDasharray={routerStatus.router1 === 'failed' ? "5,5" : "0"}
                    animate={routerStatus.router1 === 'failed' ? {} : { strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* PRIMARY PATH: Router 1 -> Server */}
                <motion.path
                    d={`M${positions.router1.x + 32} ${positions.router1.y} Q ${positions.server.x - 50} ${positions.server.y + 100} ${positions.server.x} ${positions.server.y + 40}`}
                    stroke={routerStatus.router1 === 'failed' ? '#ef4444' : '#bc13fe'}
                    strokeWidth={routerStatus.router1 === 'failed' ? "1" : "2"}
                    fill="none"
                    strokeDasharray={routerStatus.router1 === 'failed' ? "5,5" : "0"}
                />

                {/* BACKUP PATH: Client -> Router 2 */}
                <motion.path
                    d={`M${positions.client.x + 32} ${positions.client.y} Q ${positions.router2.x} ${positions.router2.y + 100} ${positions.router2.x} ${positions.router2.y + 32}`}
                    stroke={routerStatus.router1 === 'failed' ? '#22c55e' : 'rgba(255,255,255,0.05)'}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    animate={routerStatus.router1 === 'failed' ? { strokeDashoffset: [0, -20] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* BACKUP PATH: Router 2 -> Server */}
                <motion.path
                    d={`M${positions.router2.x + 32} ${positions.router2.y} Q ${positions.server.x - 50} ${positions.server.y + 100} ${positions.server.x} ${positions.server.y + 40}`}
                    stroke={routerStatus.router1 === 'failed' ? '#22c55e' : 'rgba(255,255,255,0.05)'}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    animate={routerStatus.router1 === 'failed' ? { strokeDashoffset: [0, -20] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            <AnimatePresence>
                {packets.map(packet => (
                    <DataPacket
                        key={packet.id}
                        id={packet.id}
                        startPos={packet.currentPos}
                        targetPos={packet.targetPos}
                        type={packet.type}
                        label={packet.label}
                        activeLayer={activeLayer}
                        onReachDestination={handlePacketArrival}
                        delay={packet.delay}
                    />
                ))}
            </AnimatePresence>

            <LayerSwitcher currentLayer={activeLayer} setLayer={setActiveLayer} />

            <ControlsPanel
                onSendPacket={sendPacket}
                onTogglePause={() => setIsPaused(!isPaused)}
                isPaused={isPaused}
                onReset={handleReset}
                packetLossMode={packetLossMode}
                setPacketLossMode={setPacketLossMode}
            />

            {/* Status Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        key={message.text}
                        className={`absolute top-8 right-8 px-6 py-3 rounded-xl border backdrop-blur-md z-50 shadow-2xl
                ${message.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-200' :
                                message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-200' :
                                    message.text.includes("SYN") || message.text.includes("ACK") ? 'bg-purple-500/10 border-purple-400 text-purple-200' :
                                        'bg-accent-cyan/10 border-accent-cyan text-cyan-200'}
              `}
                    >
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </NetworkWorld>
    );
};

export default MainScene;
