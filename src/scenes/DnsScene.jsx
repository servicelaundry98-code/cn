import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Server, ArrowRight, Laptop, Globe, Database, Activity } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const DnsScene = ({ onBack }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);
    const [domain, setDomain] = useState('google.com');
    const [logs, setLogs] = useState([]);

    const logMessage = (msg) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`, ...prev]);
    };

    const runSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setStepIndex(0);
        setLogs([]);

        logMessage(`Starting Recursive Lookup for "${domain}"...`);

        // Step 1: Client -> Resolver
        setTimeout(() => {
            setStepIndex(1);
            logMessage("Client checks local cache... MISS.");
            logMessage("Sending query to ISP Resolver (Recursive).");
        }, 1000);

        // Step 2: Resolver -> Root
        setTimeout(() => {
            setStepIndex(2);
            logMessage("Resolver asks ROOT Server: 'Where is .com?'");
        }, 3000);

        // Step 3: Root -> Resolver
        setTimeout(() => {
            setStepIndex(3);
            logMessage("ROOT Server responds: 'I don't know IP, but here is .COM TLD Server.'");
        }, 5000);

        // Step 4: Resolver -> TLD
        setTimeout(() => {
            setStepIndex(4);
            logMessage("Resolver asks TLD Server: 'Where is google.com?'");
        }, 7000);

        // Step 5: TLD -> Resolver
        setTimeout(() => {
            setStepIndex(5);
            logMessage("TLD Server responds: 'Ask the Authoritative NS at 216.239.32.10'");
        }, 9000);

        // Step 6: Resolver -> Auth
        setTimeout(() => {
            setStepIndex(6);
            logMessage("Resolver asks Authoritative Server: 'IP for google.com?'");
        }, 11000);

        // Step 7: Auth -> Resolver
        setTimeout(() => {
            setStepIndex(7);
            logMessage("Authoritative Server responds: 'It is 142.250.190.46'");
        }, 13000);

        // Step 8: Resolver -> Client
        setTimeout(() => {
            setStepIndex(8);
            logMessage("Resolver caches the IP.");
            logMessage("Returns 142.250.190.46 to Client.");
            setIsSimulating(false);
        }, 15000);
    };

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-orange-400 mb-2">Domain Name System (DNS)</h3>
                <p className="text-sm text-white/70">
                    Computers don't understand "google.com". They only know IP Addresses (142.250.190.46). DNS is the phonebook that translates the two.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">Recursive Lookup Hierarchy</h4>

                <div className="pl-4 border-l-2 border-purple-500">
                    <div className="font-bold text-purple-300 text-sm">1. Root Server (.)</div>
                    <p className="text-xs text-white/60">The top of the pyramid. Knows where TLDs (.com, .org) live.</p>
                </div>

                <div className="pl-4 border-l-2 border-orange-500">
                    <div className="font-bold text-orange-300 text-sm">2. TLD Server (.com)</div>
                    <p className="text-xs text-white/60">Top-Level Domain. Knows who owns "google.com".</p>
                </div>

                <div className="pl-4 border-l-2 border-green-500">
                    <div className="font-bold text-green-300 text-sm">3. Authoritative Server</div>
                    <p className="text-xs text-white/60">The final expert. It holds the actual IP address record.</p>
                </div>
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-3xl aspect-video bg-black/20 rounded-xl border border-white/5">

                {/* Nodes */}
                {/* ISP Resolver (Left) */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <motion.div
                        animate={{ scale: [1, 2, 8].includes(stepIndex) ? 1.1 : 1, borderColor: [1, 2, 8].includes(stepIndex) ? '#06b6d4' : '#334155' }}
                        className="w-20 h-20 bg-slate-800 rounded-full border-2 flex items-center justify-center relative z-10"
                    >
                        <Map size={32} className="text-cyan-400" />
                        <span className="absolute -top-6 text-[10px] font-bold text-cyan-300 whitespace-nowrap">ISP Resolver</span>
                    </motion.div>
                </div>

                {/* Root (Top Right) */}
                <div className="absolute right-32 top-12 flex flex-col items-center">
                    <motion.div
                        animate={{ scale: [2, 3].includes(stepIndex) ? 1.1 : 1, borderColor: [2, 3].includes(stepIndex) ? '#a855f7' : '#334155' }}
                        className="w-16 h-16 bg-slate-800 rounded-lg border-2 flex items-center justify-center z-10"
                    >
                        <span className="text-2xl font-black text-purple-400">.</span>
                        <span className="absolute -top-6 text-[10px] font-bold text-purple-300 whitespace-nowrap">Root Server</span>
                    </motion.div>
                </div>

                {/* TLD (Middle Right) */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <motion.div
                        animate={{ scale: [4, 5].includes(stepIndex) ? 1.1 : 1, borderColor: [4, 5].includes(stepIndex) ? '#f97316' : '#334155' }}
                        className="w-16 h-16 bg-slate-800 rounded-lg border-2 flex items-center justify-center z-10"
                    >
                        <span className="text-lg font-bold text-orange-400">.COM</span>
                        <span className="absolute -top-6 text-[10px] font-bold text-orange-300 whitespace-nowrap">TLD Server</span>
                    </motion.div>
                </div>

                {/* Auth (Bottom Right) */}
                <div className="absolute right-32 bottom-12 flex flex-col items-center">
                    <motion.div
                        animate={{ scale: [6, 7].includes(stepIndex) ? 1.1 : 1, borderColor: [6, 7].includes(stepIndex) ? '#22c55e' : '#334155' }}
                        className="w-16 h-16 bg-slate-800 rounded-lg border-2 flex items-center justify-center z-10"
                    >
                        <Database size={24} className="text-green-400" />
                        <span className="absolute -bottom-6 text-[10px] font-bold text-green-300 whitespace-nowrap">Authoritative</span>
                    </motion.div>
                </div>

                {/* Packet Animations */}
                <AnimatePresence>
                    {/* Step 2: Resolver -> Root */}
                    {stepIndex === 2 && <motion.div initial={{ x: 80, y: 150 }} animate={{ x: 500, y: 50 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />}
                    {/* Step 3: Root -> Resolver */}
                    {stepIndex === 3 && <motion.div initial={{ x: 500, y: 50 }} animate={{ x: 80, y: 150 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_10px_purple]" />}

                    {/* Step 4: Resolver -> TLD */}
                    {stepIndex === 4 && <motion.div initial={{ x: 80, y: 150 }} animate={{ x: 600, y: 150 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />}
                    {/* Step 5: TLD -> Resolver */}
                    {stepIndex === 5 && <motion.div initial={{ x: 600, y: 150 }} animate={{ x: 80, y: 150 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_10px_orange]" />}

                    {/* Step 6: Resolver -> Auth */}
                    {stepIndex === 6 && <motion.div initial={{ x: 80, y: 150 }} animate={{ x: 500, y: 250 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />}
                    {/* Step 7: Auth -> Resolver */}
                    {stepIndex === 7 && <motion.div initial={{ x: 500, y: 250 }} animate={{ x: 80, y: 150 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute z-20 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_green]" />}

                </AnimatePresence>

                {/* Result Overlay */}
                {stepIndex === 8 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center"
                    >
                        <div className="bg-green-500/20 border border-green-500 rounded-xl p-6 text-center">
                            <h3 className="text-2xl font-bold text-green-400 mb-2">RESOLVED</h3>
                            <div className="text-4xl font-mono text-white mb-4">142.250.190.46</div>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-2">
                <div className="flex-1 bg-white/10 px-4 py-3 rounded-xl flex items-center gap-2 border border-white/20">
                    <Search size={16} className="text-white/50" />
                    <span className="font-mono text-sm text-white">google.com</span>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="px-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
                >
                    GO
                </button>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Query Trace</span>
                    <Activity size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Enter a domain to trace...</span>}
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/70 border-l-2 border-orange-500/30 pl-2 pb-1 leading-relaxed"
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
            title="DNS Resolution"
            subtitle="Module 6: The Internet Phonebook"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default DnsScene;
