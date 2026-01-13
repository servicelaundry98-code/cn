import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Server, AlertTriangle, Bug, Globe, ShieldCheck, ShieldAlert, Activity } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const ZapIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

const PACKET_TYPES = [
    { type: 'valid', color: '#4ade80', name: 'HTTP Req', icon: 'HTTP' }, // Green
    { type: 'malware', color: '#ef4444', name: 'Trojan.exe', icon: <Bug size={10} /> }, // Red
    { type: 'ddos', color: '#f59e0b', name: 'Ping Flood', icon: <ZapIcon /> }, // Orange
];

const SecurityScene = ({ onBack }) => {
    const [firewallActive, setFirewallActive] = useState(true);
    const [packets, setPackets] = useState([]);
    const [stats, setStats] = useState({ allowed: 0, blocked: 0 });
    const [logs, setLogs] = useState([]);

    const logMessage = (msg, type = 'info') => {
        setLogs(prev => [`[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`, ...prev.slice(0, 19)]);
    };

    // Packet Generator
    useEffect(() => {
        const interval = setInterval(() => {
            if (packets.length > 8) return;

            const rand = Math.random();
            // 50% Valid, 30% Malware, 20% DDoS
            const typeData = rand > 0.5 ? PACKET_TYPES[0] : (rand > 0.2 ? PACKET_TYPES[1] : PACKET_TYPES[2]);

            setPackets(prev => [...prev, {
                id: Date.now() + Math.random(),
                ...typeData,
                x: 0,
                status: 'pending'
            }]);

        }, 1200);

        return () => clearInterval(interval);
    }, [packets.length]);

    // Packet Logic Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setPackets(prevPackets => {
                return prevPackets.map(p => {
                    let newX = p.x + 8; // Speed

                    // Collision with Firewall Line (at x=400 approx, center of 800px cont)
                    // Let's assume container is approx 600px wide in visualContent
                    const firewallX = 300;

                    if (p.status === 'pending' && newX >= firewallX - 20) {
                        if (firewallActive) {
                            if (p.type === 'valid') {
                                p.status = 'allowed';
                                setStats(s => ({ ...s, allowed: s.allowed + 1 }));
                                logMessage(`ALLOWED: ${p.name} -> Port 80`, 'success');
                            } else {
                                p.status = 'rejected';
                                setStats(s => ({ ...s, blocked: s.blocked + 1 }));
                                logMessage(`BLOCKED: ${p.name} from External IP`, 'error');
                                return null; // blocked
                            }
                        } else {
                            p.status = 'allowed';
                            if (p.type !== 'valid') {
                                logMessage(`WARNING: ${p.name} infiltrated network!`, 'warning');
                            } else {
                                logMessage(`ALLOWED: ${p.name}`, 'success');
                            }
                        }
                    }

                    if (newX > 600) return null; // exceed screen

                    return { ...p, x: newX };
                }).filter(Boolean);
            });
        }, 50);

        return () => clearInterval(interval);
    }, [firewallActive]);

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className={`p-4 rounded-xl border transition-colors ${firewallActive ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {firewallActive ? <ShieldCheck className="text-cyan-400" /> : <ShieldAlert className="text-red-400" />}
                    <span className={firewallActive ? "text-cyan-400" : "text-red-400"}>
                        Status: {firewallActive ? 'PROTECTED' : 'VULNERABLE'}
                    </span>
                </h3>
                <p className="text-sm text-white/70">
                    {firewallActive
                        ? "The Firewall is actively inspecting packet headers. It drops any traffic that matches 'Malware' or 'DDoS' signatures."
                        : "The barrier is down. All traffic, including malicious payloads, is flowing freely into the server."}
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">The Rules</h4>

                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-white/80">Allow HTTP (Port 80)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-white/80">Block Known Malware signatures</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-sm text-white/80">Rate Limit High-Frequency requests (DDoS)</span>
                </div>
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">

            {/* The Environment */}
            <div className="relative w-full max-w-2xl h-[300px] border border-white/5 bg-black/20 rounded-xl flex items-center overflow-hidden">

                {/* Zones */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-red-900/5 border-r border-white/5 flex items-center justify-center">
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold text-red-500/30 uppercase">Untrusted Zone (Internet)</span>
                </div>
                <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-900/5 flex items-center justify-center">
                    <span className="absolute bottom-4 right-4 text-[10px] font-bold text-blue-500/30 uppercase">Trusted Zone (Intranet)</span>
                </div>

                {/* The Firewall Line */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full flex flex-col items-center justify-center z-20">
                    <motion.div
                        animate={{
                            height: firewallActive ? '100%' : '0%',
                            opacity: firewallActive ? 1 : 0
                        }}
                        className="w-1 bg-cyan-500 shadow-[0_0_30px_cyan]"
                    />
                </div>

                {/* Toggle Button (Center) */}
                <button
                    onClick={() => setFirewallActive(!firewallActive)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group"
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 backdrop-blur-md transition-all duration-300 shadow-2xl
                        ${firewallActive
                            ? 'bg-cyan-600/20 border-cyan-400 group-hover:scale-110 shadow-[0_0_50px_rgba(6,182,212,0.4)]'
                            : 'bg-red-600/10 border-red-500/50 grayscale opacity-50'}
                    `}>
                        {firewallActive ? <Shield size={32} className="text-cyan-300" /> : <Lock size={32} className="text-red-300" />}
                    </div>
                </button>

                {/* Nodes */}
                <div className="absolute left-8 z-10 opacity-50"><Globe size={48} /></div>
                <div className="absolute right-8 z-10 opacity-50"><Server size={48} /></div>

                {/* Moving Packets */}
                <AnimatePresence>
                    {packets.map(p => (
                        <motion.div
                            key={p.id}
                            className="absolute z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-black font-bold text-[10px]"
                            style={{
                                backgroundColor: p.color,
                                boxShadow: `0 0 15px ${p.color}`,
                                top: 150 + Math.sin(p.x * 0.05) * 40
                            }}
                            initial={{ x: 50, scale: 0 }}
                            animate={{ x: p.x, scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                        >
                            {p.icon}
                        </motion.div>
                    ))}
                </AnimatePresence>

            </div>
        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">

            <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.allowed}</div>
                    <div className="text-[10px] uppercase text-green-200/50">Allowed</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-400">{stats.blocked}</div>
                    <div className="text-[10px] uppercase text-red-200/50">Blocked</div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Security Event Log</span>
                    <Activity size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Monitoring traffic...</span>}
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`border-l-2 pl-2 pb-1 leading-relaxed ${log.includes('BLOCKED') ? 'border-red-500 text-red-300' :
                                    log.includes('WARNING') ? 'border-orange-500 text-orange-300' :
                                        'border-green-500 text-green-300'
                                }`}
                        >
                            {log}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="Network Security"
            subtitle="Module 7: The Firewall Barrier"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default SecurityScene;
