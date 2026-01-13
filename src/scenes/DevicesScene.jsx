import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEVICE_TYPES } from '../data/devices';
import NetworkDevice from '../devices/NetworkDevice';
import { Play, Laptop, Server, AlertTriangle } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const DevicesScene = ({ onBack }) => {
    const [activeDevice, setActiveDevice] = useState(DEVICE_TYPES[0]); // Default Hub
    const [packets, setPackets] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationLog, setSimulationLog] = useState([]);

    const handleDeviceSelect = (device) => {
        setActiveDevice(device);
        setPackets([]);
        setIsSimulating(false);
        setSimulationLog([]);
    };

    const addLog = (msg) => {
        setSimulationLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const triggerSimulation = () => {
        setIsSimulating(true);
        const newPackets = [];

        if (activeDevice.id === 'hub') {
            addLog("Hub received data. Broadcasting to ALL ports...");
            [1, 2, 3].forEach(i => {
                newPackets.push({ id: Date.now() + i, target: i, type: 'broadcast' });
            });
            setTimeout(() => addLog("Warning: High collision risk detected."), 500);
        } else if (activeDevice.id === 'switch') {
            addLog("Switch received frame for Node 2.");
            addLog("Consulting MAC Address Table...");
            newPackets.push({ id: Date.now(), target: 2, type: 'unicast' });
            setTimeout(() => addLog("Forwarding only to Port 2."), 500);
        } else if (activeDevice.id === 'router') {
            addLog("Router received packet for 8.8.8.8.");
            addLog("Destination is external. Routing to Gateway.");
            newPackets.push({ id: Date.now(), target: 'gateway', type: 'route' });
        }

        setPackets(newPackets);

        setTimeout(() => {
            setIsSimulating(false);
            setPackets([]);
            addLog("Transmission complete.");
        }, 3000);
    };

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="p-4 rounded-xl border border-l-4 bg-white/5" style={{ borderColor: activeDevice.color }}>
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2" style={{ color: activeDevice.color }}>
                    <activeDevice.icon size={24} />
                    {activeDevice.name}
                </h3>
                <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">{activeDevice.metaphor}</h4>
                <p className="text-sm leading-relaxed text-white/80">
                    {activeDevice.description}
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white">How it works:</h4>
                {activeDevice.id === 'hub' && (
                    <ul className="list-disc list-inside text-sm text-white/70 space-y-2">
                        <li>Operates at <strong>Layer 1 (Physical)</strong>.</li>
                        <li>It is "Dumb" - it has no memory.</li>
                        <li>Simply repeats electrical signals to every port.</li>
                        <li className="text-red-400">Inefficient and insecure.</li>
                    </ul>
                )}
                {activeDevice.id === 'switch' && (
                    <ul className="list-disc list-inside text-sm text-white/70 space-y-2">
                        <li>Operates at <strong>Layer 2 (Data Link)</strong>.</li>
                        <li>Uses <strong>MAC Addresses</strong> to identify devices.</li>
                        <li>Builds a "MAC Table" in memory.</li>
                        <li className="text-blue-400">Creates private connections.</li>
                    </ul>
                )}
                {activeDevice.id === 'router' && (
                    <ul className="list-disc list-inside text-sm text-white/70 space-y-2">
                        <li>Operates at <strong>Layer 3 (Network)</strong>.</li>
                        <li>Uses <strong>IP Addresses</strong> to route data.</li>
                        <li>Connects different networks (LAN to WAN).</li>
                        <li className="text-green-400">The gateway to the Internet.</li>
                    </ul>
                )}
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center pt-8">

            {/* Device Selector (Moved to Top of Visual for Context) */}
            <div className="flex gap-4 mb-8 z-20">
                {DEVICE_TYPES.map(device => (
                    <button
                        key={device.id}
                        onClick={() => handleDeviceSelect(device)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${activeDevice.id === device.id
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-transparent border-white/10 text-white/40 hover:text-white'
                            }`}
                    >
                        <device.icon size={14} />
                        <span className="text-xs font-bold">{device.name}</span>
                    </button>
                ))}
            </div>

            {/* Simulation Stage */}
            <div className="relative w-full max-w-lg aspect-video">

                {/* Visual Logic (Same as before) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Central Device */}
                    <motion.div
                        animate={{ scale: isSimulating ? 1.1 : 1 }}
                        className="relative z-10 w-24 h-24 flex items-center justify-center"
                    >
                        <activeDevice.icon size={64} color={activeDevice.color} />
                        <div className="absolute inset-0 blur-xl opacity-30" style={{ backgroundColor: activeDevice.color }} />
                    </motion.div>

                    {/* Nodes */}
                    {[1, 2, 3].map((id, index) => {
                        const xOffset = (index - 1) * 150;
                        return (
                            <div
                                key={id}
                                className="absolute bottom-[-80px] flex flex-col items-center gap-2"
                                style={{ transform: `translateX(${xOffset}px)` }}
                            >
                                <div className="w-0.5 h-20 bg-white/10 absolute -top-20 origin-bottom" style={{ transform: `rotate(${(index - 1) * -20}deg)` }} />
                                <Laptop size={24} className="text-white/60" />
                                <span className="text-[10px] font-mono text-white/40">Node {id}</span>
                            </div>
                        );
                    })}

                    {/* Gateway */}
                    {activeDevice.id === 'router' && (
                        <div className="absolute top-[-80px] flex flex-col items-center gap-2">
                            <Server size={24} className="text-green-400" />
                            <span className="text-[10px] font-mono text-green-400">Internet</span>
                            <div className="w-0.5 h-20 bg-green-500/20 absolute top-8" />
                        </div>
                    )}
                </div>

                {/* Packets */}
                <AnimatePresence>
                    {packets.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{
                                x: p.target === 'gateway' ? 0 : (p.target - 2) * 150,
                                y: p.target === 'gateway' ? -100 : 100,
                                scale: 1
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-3 h-3 rounded-full shadow-lg"
                            style={{ backgroundColor: activeDevice.color }}
                        />
                    ))}
                </AnimatePresence>

                {/* Collisions Warning */}
                {activeDevice.id === 'hub' && isSimulating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xs flex items-center gap-1"
                    >
                        <AlertTriangle size={12} /> COLLISION RISK
                    </motion.div>
                )}

            </div>
        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
                <Play size={18} fill="currentColor" />
                SIMULATE
            </button>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50">Activity Log</div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {simulationLog.length === 0 && <span className="text-white/20 italic">Ready for simulation...</span>}
                    {simulationLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/70 border-l-2 border-white/10 pl-2"
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
            title="Network Devices"
            subtitle="Module 3: Hubs, Switches, & Routers"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default DevicesScene;
