import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle, Smartphone, Server, Shield, ArrowRight, Activity, Clock } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const TcpHandshakeScene = ({ onBack }) => {
    const [step, setStep] = useState(0);
    // 0: Idle
    // 1: SYN (Client -> Server)
    // 2: SYN-ACK (Server -> Client)
    // 3: ACK (Client -> Server) -> ESTABLISHED

    // Log state to satisfy "Details" requirement
    const [logs, setLogs] = useState([]);

    const logMessage = (msg, type = 'info') => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const handleNextStep = () => {
        if (step === 0) {
            setStep(1);
            logMessage("Client triggers CONNECT.");
            logMessage("Client State: SYN_SENT");
            logMessage("Sending Packet: [SYN, SEQ=100]");
        } else if (step === 1) {
            setStep(2);
            logMessage("Server received SYN.");
            logMessage("Server State: SYN_RCVD");
            logMessage("Sending Packet: [SYN, ACK, SEQ=300, ACK=101]");
        } else if (step === 2) {
            setStep(3);
            logMessage("Client received SYN-ACK.");
            logMessage("Client State: ESTABLISHED");
            logMessage("Sending Packet: [ACK, SEQ=101, ACK=301]");
            setTimeout(() => {
                logMessage("Server State: ESTABLISHED");
                logMessage("Connection Secure. Ready for Data.");
            }, 1500);
        } else {
            setStep(0); // Reset
            setLogs([]);
            logMessage("Connection Reset.");
        }
    };

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Transmission Control Protocol (TCP)</h3>
                <p className="text-sm text-white/70">
                    The internet needs reliability. UDP is fast but chaotic. TCP is the polite, reliable alternative. It requires a formal "Handshake" before sending any real data.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">The 3-Step Process</h4>

                <div className={`p-3 rounded border transition-all ${step === 1 ? 'bg-yellow-500/10 border-yellow-500' : 'border-transparent bg-white/5'}`}>
                    <div className="font-bold text-yellow-500 text-sm mb-1">1. SYN (Synchronize)</div>
                    <p className="text-xs text-white/60">I want to connect. My Sequence Number is X.</p>
                </div>

                <div className={`p-3 rounded border transition-all ${step === 2 ? 'bg-green-500/10 border-green-500' : 'border-transparent bg-white/5'}`}>
                    <div className="font-bold text-green-500 text-sm mb-1">2. SYN-ACK (Sync + Acknowledge)</div>
                    <p className="text-xs text-white/60">I see your X. I'm ready too. My Sequence Number is Y.</p>
                </div>

                <div className={`p-3 rounded border transition-all ${step === 3 ? 'bg-blue-500/10 border-blue-500' : 'border-transparent bg-white/5'}`}>
                    <div className="font-bold text-blue-500 text-sm mb-1">3. ACK (Acknowledge)</div>
                    <p className="text-xs text-white/60">I see your Y. Connection Established.</p>
                </div>
            </div>

            <div className="bg-purple-900/20 p-4 rounded text-xs text-purple-200 border border-purple-500/30">
                <strong>Why?</strong> This prevents confusion. Both sides know exactly which byte of data comes next (Sequence Numbers).
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center relative">

            {/* The Stage */}
            <div className="relative w-full max-w-2xl px-12 aspect-[2/1] bg-white/5 rounded-full border border-white/5 flex items-center justify-between">

                {/* Visual Connection Tether */}
                <motion.div
                    className="absolute left-[80px] right-[80px] h-1 bg-white/10 top-1/2 -translate-y-1/2"
                    animate={{
                        backgroundColor: step === 3 ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                        boxShadow: step === 3 ? '0 0 20px cyan' : 'none'
                    }}
                />

                {/* Client */}
                <div className="relative z-10 text-center">
                    <motion.div
                        animate={{ scale: step === 3 ? 1.1 : 1, borderColor: step === 3 ? '#06b6d4' : '#3b82f6' }}
                        className="w-24 h-24 rounded-2xl bg-[#0a0a15] border-2 border-blue-500 flex items-center justify-center shadow-2xl relative"
                    >
                        <Smartphone size={40} className="text-blue-400" />

                        {/* Status Label */}
                        <div className="absolute -top-8 w-max text-xs font-mono font-bold text-blue-300">
                            {step === 0 ? 'CLOSED' : step === 3 ? 'ESTABLISHED' : 'SYN_SENT'}
                        </div>
                    </motion.div>
                </div>

                {/* Server */}
                <div className="relative z-10 text-center">
                    <motion.div
                        animate={{ scale: step === 3 ? 1.1 : 1, borderColor: step === 3 ? '#06b6d4' : '#a855f7' }}
                        className="w-24 h-24 rounded-full bg-[#0a0a15] border-2 border-purple-500 flex items-center justify-center shadow-2xl relative"
                    >
                        <Server size={40} className="text-purple-400" />

                        {/* Status Label */}
                        <div className="absolute -top-8 w-max text-xs font-mono font-bold text-purple-300">
                            {step === 0 ? 'LISTEN' : step === 3 ? 'ESTABLISHED' : 'SYN_RCVD'}
                        </div>
                    </motion.div>
                </div>

                {/* Packets */}
                <AnimatePresence>
                    {step === 1 && (
                        <motion.div
                            initial={{ left: '80px', opacity: 0 }}
                            animate={{ left: 'calc(100% - 100px)', opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-1/2 -translate-y-1/2 z-20"
                        >
                            <div className="bg-yellow-400 text-black font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                                SYN (SEQ=100)
                            </div>
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            initial={{ right: '80px', opacity: 0 }}
                            animate={{ right: 'calc(100% - 100px)', opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-1/2 -translate-y-1/2 z-20"
                        >
                            <div className="bg-green-400 text-black font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                                SYN-ACK (ACK=101)
                            </div>
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div
                            initial={{ left: '80px', opacity: 0 }}
                            animate={{ left: 'calc(100% - 100px)', opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute top-1/2 -translate-y-1/2 z-20"
                        >
                            <div className="bg-blue-400 text-black font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(96,165,250,0.5)]">
                                ACK (ACK=301)
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <button
                onClick={handleNextStep}
                className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2
                    ${step === 3 ? 'bg-red-600 hover:bg-red-500' : 'bg-cyan-600 hover:bg-cyan-500'}
                    text-white
                `}
            >
                {step === 3 ? <>RESET CONNECTION <RefreshCw size={18} /></> : <>NEXT STEP <ArrowRight size={18} /></>}
            </button>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Protocol State Log</span>
                    <Clock size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Waiting for handshake start...</span>}
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/70 border-l-2 border-cyan-500/30 pl-2 pb-1"
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
            title="TCP Handshake"
            subtitle="Module 4: Establishing Reliable Connections"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default TcpHandshakeScene;
