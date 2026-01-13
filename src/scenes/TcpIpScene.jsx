import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Layout, Server, Laptop } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const OSI_LAYERS = [
    { id: 7, name: 'Application', color: '#ec4899' },
    { id: 6, name: 'Presentation', color: '#d946ef' },
    { id: 5, name: 'Session', color: '#a855f7' },
    { id: 4, name: 'Transport', color: '#8b5cf6' },
    { id: 3, name: 'Network', color: '#6366f1' },
    { id: 2, name: 'Data Link', color: '#3b82f6' },
    { id: 1, name: 'Physical', color: '#06b6d4' },
];

const TCPIP_LAYERS = [
    { id: 4, name: 'Application', color: '#ec4899', mapsTo: [7, 6, 5] },
    { id: 3, name: 'Transport', color: '#8b5cf6', mapsTo: [4] },
    { id: 2, name: 'Internet', color: '#6366f1', mapsTo: [3] },
    { id: 1, name: 'Network Access', color: '#06b6d4', mapsTo: [2, 1] },
];

const TcpIpScene = ({ onBack }) => {
    const [hoveredTcpLayer, setHoveredTcpLayer] = useState(null);

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">OSI vs TCP/IP</h3>
                <p className="text-sm text-white/70">
                    The <strong>OSI Model</strong> is the theoretical standard (7 layers).
                </p>
                <p className="text-sm text-white/70 mt-2">
                    The <strong>TCP/IP Model</strong> is the practical reality used by the Internet (4 layers).
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">Key Differences</h4>

                <div className="pl-4 border-l-2 border-pink-500">
                    <div className="font-bold text-pink-300 text-sm">Application Layer (TCP/IP)</div>
                    <p className="text-xs text-white/60">Combines OSI Application, Presentation, and Session. It handles all detailed data formatting.</p>
                </div>

                <div className="pl-4 border-l-2 border-indigo-500">
                    <div className="font-bold text-indigo-300 text-sm">Internet Layer (TCP/IP)</div>
                    <p className="text-xs text-white/60">Equivalent to OSI Network Layer. Focuses purely on IP Addressing and Routing.</p>
                </div>

                <div className="pl-4 border-l-2 border-cyan-500">
                    <div className="font-bold text-cyan-300 text-sm">Network Access (TCP/IP)</div>
                    <p className="text-xs text-white/60">Combines Data Link and Physical. It handles the raw hardware transmission.</p>
                </div>
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex items-center justify-center p-8 gap-16">

            {/* OSI STACK (Left) */}
            <div className="flex flex-col gap-2 w-64 relative">
                <h3 className="text-center font-bold text-white/50 mb-4">OSI Model (Theoretical)</h3>
                {OSI_LAYERS.map(layer => {
                    // Check if this layer is highlighted by the hover
                    const isHighlighted = hoveredTcpLayer && hoveredTcpLayer.mapsTo.includes(layer.id);

                    return (
                        <motion.div
                            key={layer.id}
                            animate={{
                                opacity: hoveredTcpLayer ? (isHighlighted ? 1 : 0.3) : 1,
                                x: isHighlighted ? 20 : 0
                            }}
                            className="p-3 rounded bg-white/5 border border-white/10 flex items-center gap-2 relative"
                            style={{ borderColor: isHighlighted ? layer.color : 'rgba(255,255,255,0.1)' }}
                        >
                            <span className="font-mono text-xs opacity-50">L{layer.id}</span>
                            <span className="font-bold text-sm" style={{ color: layer.color }}>{layer.name}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* MAPPING ARROWS */}
            <div className="flex flex-col h-[400px] justify-center text-white/20">
                <ArrowRight size={48} />
            </div>

            {/* TCP/IP STACK (Right) */}
            <div className="flex flex-col gap-2 w-64">
                <h3 className="text-center font-bold text-white/50 mb-4">TCP/IP Model (Practical)</h3>
                {TCPIP_LAYERS.map(layer => (
                    <motion.div
                        key={layer.id}
                        onHoverStart={() => setHoveredTcpLayer(layer)}
                        onHoverEnd={() => setHoveredTcpLayer(null)}
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded bg-white/5 border border-white/10 flex flex-col justify-center relative cursor-pointer group"
                        // Dynamic Height based on how many OSI layers it maps to
                        style={{
                            height: layer.mapsTo.length * 52 + (layer.mapsTo.length - 1) * 8, // Approx height calc
                            borderColor: layer.color
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs opacity-50">L{layer.id}</span>
                            <span className="font-bold text-lg group-hover:text-white transition-colors" style={{ color: layer.color }}>{layer.name}</span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-tight">
                            Includes OSI L{Math.min(...layer.mapsTo)}-L{Math.max(...layer.mapsTo)}
                        </p>
                    </motion.div>
                ))}
            </div>

        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-center">
                <Layout size={48} className="text-white/20" />
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col p-4">
                <h4 className="text-xs font-bold uppercase text-white/50 mb-4">Protocol Map</h4>

                {hoveredTcpLayer ? (
                    <div className="space-y-4">
                        <div className="text-xl font-bold" style={{ color: hoveredTcpLayer.color }}>
                            {hoveredTcpLayer.name} Layer
                        </div>

                        <div className="space-y-2">
                            <h5 className="text-xs font-bold text-white/40 uppercase">Core Protocols:</h5>
                            <div className="flex flex-wrap gap-2">
                                {hoveredTcpLayer.id === 4 && <>
                                    <span className="px-2 py-1 rounded bg-pink-500/20 text-pink-300 text-xs">HTTP</span>
                                    <span className="px-2 py-1 rounded bg-pink-500/20 text-pink-300 text-xs">DNS</span>
                                    <span className="px-2 py-1 rounded bg-pink-500/20 text-pink-300 text-xs">SSH</span>
                                </>}
                                {hoveredTcpLayer.id === 3 && <>
                                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">TCP</span>
                                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">UDP</span>
                                </>}
                                {hoveredTcpLayer.id === 2 && <>
                                    <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs">IP</span>
                                    <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs">ICMP</span>
                                    <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs">OSPF</span>
                                </>}
                                {hoveredTcpLayer.id === 1 && <>
                                    <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs">Ethernet</span>
                                    <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs">Wi-Fi</span>
                                </>}
                            </div>
                        </div>

                        <div className="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4 mt-4">
                            Hover over the TCP/IP layers to see how they consolidate the functions of the OSI model for efficiency.
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-center text-white/30 text-xs italic">
                        Hover over a TCP/IP Layer to see details.
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="TCP/IP Model"
            subtitle="Module 8: The Real Internet Model"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default TcpIpScene;
