import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Zap, Shield, Clock, Activity, PlayCircle, RefreshCw } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const UdpScene = ({ onBack }) => {
    const [mode, setMode] = useState('idle'); // 'idle' | 'tcp' | 'udp'
    const [tcpPackets, setTcpPackets] = useState([]);
    const [udpPackets, setUdpPackets] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ tcp: { sent: 0, received: 0, time: 0 }, udp: { sent: 0, received: 0, lost: 0, time: 0 } });

    const logMessage = (msg, type = 'info') => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 20));
    };

    const runTcpDemo = () => {
        setMode('tcp');
        setTcpPackets([]);
        setLogs([]);
        logMessage('🔵 TCP Mode: Starting reliable transmission...');
        logMessage('Step 1: Establishing 3-way handshake...');

        const startTime = Date.now();

        // Handshake
        setTimeout(() => {
            logMessage('✅ Connection established (SYN, SYN-ACK, ACK)');
            logMessage('Step 2: Sending data packets...');
        }, 1000);

        // Send packets slowly with acknowledgments
        [1, 2, 3, 4, 5].forEach((id, index) => {
            setTimeout(() => {
                setTcpPackets(prev => [...prev, { id, status: 'sending' }]);
                logMessage(`📤 Sending Packet ${id}...`);
            }, 2000 + index * 1500);

            setTimeout(() => {
                setTcpPackets(prev => prev.map(p => p.id === id ? { ...p, status: 'ack' } : p));
                logMessage(`✅ ACK received for Packet ${id}`);
            }, 2000 + index * 1500 + 800);
        });

        // Complete
        setTimeout(() => {
            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(1);
            setStats(prev => ({ ...prev, tcp: { sent: 5, received: 5, time: duration } }));
            logMessage(`✅ All packets delivered successfully!`);
            logMessage(`⏱️ Total time: ${duration}s (Reliable but slower)`);
            setMode('idle');
        }, 2000 + 5 * 1500 + 1000);
    };

    const runUdpDemo = () => {
        setMode('udp');
        setUdpPackets([]);
        setLogs([]);
        logMessage('🟢 UDP Mode: Starting fast transmission...');
        logMessage('⚡ No handshake needed - sending immediately!');

        const startTime = Date.now();

        // Send all packets quickly
        [1, 2, 3, 4, 5].forEach((id, index) => {
            setTimeout(() => {
                // Simulate 20% packet loss
                const lost = Math.random() < 0.2;
                setUdpPackets(prev => [...prev, { id, status: lost ? 'lost' : 'delivered' }]);
                if (lost) {
                    logMessage(`❌ Packet ${id} lost in transit!`);
                } else {
                    logMessage(`✅ Packet ${id} delivered (no ACK)`);
                }
            }, 500 + index * 300);
        });

        // Complete
        setTimeout(() => {
            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(1);
            const delivered = udpPackets.filter(p => p.status === 'delivered').length;
            const lost = 5 - delivered;
            setStats(prev => ({ ...prev, udp: { sent: 5, received: delivered, lost, time: duration } }));
            logMessage(`📊 Transmission complete!`);
            logMessage(`⏱️ Total time: ${duration}s (Fast but unreliable)`);
            logMessage(`✅ Delivered: ${delivered}/5 | ❌ Lost: ${lost}/5`);
            setMode('idle');
        }, 500 + 5 * 300 + 500);
    };

    const reset = () => {
        setMode('idle');
        setTcpPackets([]);
        setUdpPackets([]);
        setLogs([]);
        setStats({ tcp: { sent: 0, received: 0, time: 0 }, udp: { sent: 0, received: 0, lost: 0, time: 0 } });
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">TCP vs UDP</h3>
                <p className="text-sm text-white/70">
                    Transport Layer ke do main protocols hain. Dono ka kaam data transfer karna hai, 
                    lekin approach bilkul alag hai.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Key Differences
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-blue-400" />
                        <strong className="text-blue-300 text-sm">TCP (Reliable)</strong>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 ml-6 list-disc">
                        <li>Connection-oriented (handshake required)</li>
                        <li>Guaranteed delivery (ACK for every packet)</li>
                        <li>Ordered delivery (packets in sequence)</li>
                        <li>Slower but reliable</li>
                        <li>Use: Web, Email, File Transfer</li>
                    </ul>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-green-400" />
                        <strong className="text-green-300 text-sm">UDP (Fast)</strong>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 ml-6 list-disc">
                        <li>Connectionless (no handshake)</li>
                        <li>No delivery guarantee (fire and forget)</li>
                        <li>No ordering (packets can arrive mixed)</li>
                        <li>Faster but unreliable</li>
                        <li>Use: Gaming, Video Streaming, DNS</li>
                    </ul>
                </div>
            </div>

            <div className="bg-purple-900/20 p-4 rounded text-xs text-purple-200 border border-purple-500/30">
                <strong>Real Example:</strong> Video call mein agar 1 frame miss ho jaye, 
                koi problem nahi (UDP). Lekin bank transaction mein har byte important hai (TCP).
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl">
                {/* Race Track */}
                <div className="relative h-64 bg-black/20 rounded-xl border border-white/5 mb-8">
                    {/* TCP Lane */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-white/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Shield size={20} className="text-blue-400" />
                                <span className="text-sm font-bold text-blue-300">TCP Lane (Reliable)</span>
                            </div>
                            {mode === 'tcp' && <Activity size={16} className="text-blue-400 animate-pulse" />}
                        </div>
                        <div className="relative h-16 bg-blue-500/10 rounded-lg border border-blue-500/30">
                            <AnimatePresence>
                                {tcpPackets.map((packet, index) => (
                                    <div
                                        key={packet.id}
                                        className="absolute top-1/2 -translate-y-1/2"
                                        style={{
                                            left: packet.status === 'ack' ? '90%' : `${10 + index * 15}%`,
                                            transition: 'left 0.8s ease-in-out'
                                        }}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                            ${packet.status === 'ack' ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-blue-500'}
                                        `}>
                                            {packet.id}
                                        </div>
                                    </div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* UDP Lane */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Zap size={20} className="text-green-400" />
                                <span className="text-sm font-bold text-green-300">UDP Lane (Fast)</span>
                            </div>
                            {mode === 'udp' && <Activity size={16} className="text-green-400 animate-pulse" />}
                        </div>
                        <div className="relative h-16 bg-green-500/10 rounded-lg border border-green-500/30">
                            <AnimatePresence>
                                {udpPackets.map((packet, index) => (
                                    <div
                                        key={packet.id}
                                        className="absolute top-1/2 -translate-y-1/2"
                                        style={{
                                            left: packet.status === 'lost' ? '50%' : '90%',
                                            transition: 'left 0.3s linear',
                                            opacity: packet.status === 'lost' ? 0 : 1
                                        }}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                            ${packet.status === 'lost' ? 'bg-red-500' : 'bg-green-500 shadow-[0_0_15px_#22c55e]'}
                                        `}>
                                            {packet.id}
                                        </div>
                                    </div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Stats Comparison */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                        <h4 className="text-sm font-bold text-blue-300 mb-3">TCP Stats</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-white/50">Sent:</span>
                                <span className="text-white font-mono">{stats.tcp.sent}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Received:</span>
                                <span className="text-green-400 font-mono">{stats.tcp.received}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Time:</span>
                                <span className="text-white font-mono">{stats.tcp.time}s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Reliability:</span>
                                <span className="text-green-400 font-bold">100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                        <h4 className="text-sm font-bold text-green-300 mb-3">UDP Stats</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-white/50">Sent:</span>
                                <span className="text-white font-mono">{stats.udp.sent}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Received:</span>
                                <span className="text-green-400 font-mono">{stats.udp.received}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Lost:</span>
                                <span className="text-red-400 font-mono">{stats.udp.lost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Time:</span>
                                <span className="text-white font-mono">{stats.udp.time}s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={runTcpDemo}
                    disabled={mode !== 'idle'}
                    className="py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Shield size={16} /> Run TCP
                </button>
                <button
                    onClick={runUdpDemo}
                    disabled={mode !== 'idle'}
                    className="py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Zap size={16} /> Run UDP
                </button>
            </div>

            <button
                onClick={reset}
                className="py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all flex items-center justify-center gap-2 text-sm"
            >
                <RefreshCcw size={14} /> Reset
            </button>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Transmission Log</span>
                    <Clock size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click a button to start...</span>}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="text-white/70 border-l-2 border-cyan-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="TCP vs UDP"
            subtitle="Module 3.5: Reliable vs Fast Protocols"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default UdpScene;
