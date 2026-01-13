import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationEngine, OSI_LAYERS } from '../engine/NetworkSimulator';
import { OsiPacket } from '../objects/Packet';
import { Play, RotateCcw, Server as ServerIcon, Network } from 'lucide-react';
import ControlPanel from '../ui/ControlPanel';
import TelemetryPanel from '../ui/TelemetryPanel';
import LessonLayout from '../ui/LessonLayout';

const OsiVisualizerScene = ({ onBack }) => {
    const [currentLayerId, setCurrentLayerId] = useState(7);
    const [visualPackets, setVisualPackets] = useState([]);
    const [message, setMessage] = useState({ text: "Ready to Start", phase: 'IDLE' });
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [showHeaders, setShowHeaders] = useState(false);

    const engineRef = useRef(null);

    useEffect(() => {
        engineRef.current = new SimulationEngine(
            setCurrentLayerId,
            setMessage,
            setVisualPackets
        );
        return () => engineRef.current.stop();
    }, []);

    const handlePlay = () => {
        if (message.phase === 'IDLE') {
            engineRef.current.startRequestFlow();
            setIsPlaying(true);
        } else {
            const playing = engineRef.current.togglePause();
            setIsPlaying(playing);
        }
    };

    const handleSpeedChange = (s) => {
        setSpeed(s);
        engineRef.current.setSpeed(s);
    };

    const isTravelPhase = message.phase === 'NETWORK_TRAVEL' || message.phase === 'NETWORK_RETURN';
    const isServerPhase = message.phase === 'SERVER_UP' || message.phase === 'SERVER_PROCESS' || message.phase === 'SERVER_DOWN';

    // Helper to get detailed theory based on active layer
    const getLayerTheory = (id) => {
        const layer = OSI_LAYERS.find(l => l.id === id);
        if (!layer) return <p>Select a layer to learn more.</p>;

        return (
            <div className="space-y-4">
                <h3 className="text-xl font-bold" style={{ color: layer.color }}>{layer.name} Layer</h3>
                <p className="text-white/80">{layer.description}</p>

                <div className="bg-white/5 p-4 rounded-lg border border-white/5 mt-4">
                    <h4 className="text-xs font-bold text-white/50 uppercase mb-2">Key Responsibilities</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-white/70">
                        {id === 7 && <>
                            <li>User Interface interaction</li>
                            <li>Network services (HTTP, FTP, SMTP)</li>
                            <li>Data generation</li>
                        </>}
                        {id === 6 && <>
                            <li>Data translation (ASCII, JPEG)</li>
                            <li>Encryption / Decryption (TLS)</li>
                            <li>Compression</li>
                        </>}
                        {id === 5 && <>
                            <li>Session establishment</li>
                            <li>Maintenance (Keep-Alive)</li>
                            <li>Termination</li>
                        </>}
                        {id === 4 && <>
                            <li>End-to-End Delivery</li>
                            <li>Segmentation & Reassembly</li>
                            <li>Error Control (TCP Retries)</li>
                        </>}
                        {id === 3 && <>
                            <li>Logical Addressing (IP ADDR)</li>
                            <li>Routing (Path Selection)</li>
                            <li>Packet Forwarding</li>
                        </>}
                        {id === 2 && <>
                            <li>Physical Addressing (MAC)</li>
                            <li>Error Detection (FCS)</li>
                            <li>Frame Switching</li>
                        </>}
                        {id === 1 && <>
                            <li>Binary Transmission (0s & 1s)</li>
                            <li>Voltage levels & Cables</li>
                            <li>Physical Topology</li>
                        </>}
                    </ul>
                </div>

                <div className="bg-black/40 p-3 rounded text-xs font-mono text-cyan-300">
                    <div>PDU: {id === 4 ? 'Segment' : id === 3 ? 'Packet' : id === 2 ? 'Frame' : id === 1 ? 'Bit' : 'Data'}</div>
                    <div>Protocol: {id === 7 ? 'HTTP' : id === 4 ? 'TCP' : id === 3 ? 'IP' : id === 2 ? 'Ethernet' : 'Wire'}</div>
                </div>
            </div>
        );
    };

    // 1. THEORY CONTENT (Left Pane)
    const theoryContent = (
        <AnimatePresence mode='wait'>
            <motion.div
                key={currentLayerId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                {getLayerTheory(currentLayerId)}
            </motion.div>
        </AnimatePresence>
    );

    // 2. VISUAL CONTENT (Center Pane)
    const visualContent = (
        <div className="w-full h-full flex flex-col relative overflow-hidden">

            {/* The Stage Layout: Stack on Left, Animation on Center/Right */}
            <div className="flex-1 flex max-w-full">

                {/* Visual Stack (The Left Rail of the Visualizer) */}
                <motion.div
                    className="w-48 bg-black/20 border-r border-white/5 flex flex-col justify-center gap-1 p-2 box-border z-10"
                    animate={{ x: isTravelPhase ? -200 : 0, opacity: isTravelPhase ? 0 : 1 }}
                >
                    {OSI_LAYERS.map((layer) => (
                        <motion.div
                            key={layer.id}
                            onClick={() => setCurrentLayerId(layer.id)}
                            animate={{
                                opacity: currentLayerId === layer.id ? 1 : 0.4,
                                scale: currentLayerId === layer.id ? 1.05 : 1,
                                borderColor: currentLayerId === layer.id ? layer.color : 'transparent'
                            }}
                            className="h-10 border rounded flex items-center px-2 cursor-pointer hover:bg-white/5 relative"
                        >
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: layer.color }} />
                            <span className="text-xs font-bold text-white/90 truncate">L{layer.id} {layer.name}</span>

                            {/* Active Indicator Line */}
                            {currentLayerId === layer.id && (
                                <motion.div layoutId="active-line" className="absolute left-0 w-0.5 h-full bg-white" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animation Canvas (The Rest) */}
                <div className="flex-1 relative flex items-center justify-center">

                    {/* Background Network Pattern */}
                    {/* <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"/> */}

                    {/* Router Visual (Network Only) */}
                    <AnimatePresence>
                        {isTravelPhase && (
                            <motion.div className="absolute flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)] bg-black">
                                    <Network size={48} className="text-cyan-400 animate-pulse" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The Packet */}
                    <AnimatePresence mode='wait'>
                        {visualPackets.map(p => (
                            <motion.div
                                key={`${p.id}-${p.phase}-${p.layer}`}
                                initial={
                                    p.phase.includes('TRAVEL') ? { x: p.phase === 'NETWORK_RETURN' ? 300 : -300, scale: 0.5 } :
                                        isServerPhase ? { y: 50, opacity: 0 } : { y: -50, opacity: 0 }
                                }
                                animate={
                                    p.phase === 'NETWORK_TRAVEL' ? { x: 100, scale: 0.6 } : // Move into Router
                                        p.phase === 'NETWORK_RETURN' ? { x: -100, scale: 0.6 } :
                                            { y: 0, opacity: 1, x: 0, scale: 1.5 }
                                }
                                exit={{ opacity: 0 }}
                                transition={{ duration: isTravelPhase ? 3 / speed : 0.5 }}
                                className="z-20"
                            >
                                <OsiPacket
                                    layer={p.layer}
                                    phase={p.phase}
                                    encapsulationLevel={p.encapsulationLevel}
                                    showHeaders={showHeaders}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                </div>

            </div>

            {/* Bottom Status Bar (Inside Visual Pane) */}
            <div className="h-12 bg-black/40 border-t border-white/5 flex items-center justify-center px-4">
                <span className={`font-mono text-xs tracking-wider ${isServerPhase ? 'text-purple-400' : 'text-cyan-300'}`}>
                    [{message.phase}] {message.text}
                </span>
            </div>

        </div>
    );

    // 3. TELEMETRY CONTENT (Right Pane)
    const telemetryContent = (
        <div className="h-full flex flex-col gap-6">
            {/* Playback Controls */}
            <div className="bg-[#0f0f16] rounded-xl p-4 border border-white/5">
                <ControlPanel
                    isPlaying={isPlaying}
                    onTogglePlay={handlePlay}
                    speed={speed}
                    setSpeed={handleSpeedChange}
                    showHeaders={showHeaders}
                    onToggleHeaders={() => setShowHeaders(!showHeaders)}
                />
            </div>

            {/* Data Inspector */}
            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50">Packet Inspector</div>
                <div className="flex-1 overflow-y-auto">
                    <TelemetryPanel
                        currentLayer={currentLayerId}
                        phase={message.phase}
                        isServer={isServerPhase}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="The OSI Model"
            subtitle="Module 2: The 7 Layers of Encapsulation"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default OsiVisualizerScene;
