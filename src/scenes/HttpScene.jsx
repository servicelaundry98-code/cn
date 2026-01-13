import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Globe, Lock, Key, Shield, Send, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const HttpScene = ({ onBack }) => {
    const [protocol, setProtocol] = useState('http'); // 'http' | 'https'
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [requestData, setRequestData] = useState({
        method: 'GET',
        url: '/api/user/profile',
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        body: null
    });

    const logMessage = (msg, type = 'info') => {
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '📡';
        setLogs(prev => [`${icon} ${msg}`, ...prev].slice(0, 15));
    };

    const runHttpDemo = () => {
        setProtocol('http');
        setStep(0);
        setLogs([]);
        logMessage('🌐 Starting HTTP Request (Insecure)...', 'info');

        setTimeout(() => {
            setStep(1);
            logMessage('📤 Sending plain text request to server...', 'info');
            logMessage('⚠️ WARNING: Data is NOT encrypted!', 'warning');
        }, 1000);

        setTimeout(() => {
            setStep(2);
            logMessage('👀 Hacker can see: GET /api/user/profile', 'error');
            logMessage('👀 Hacker can see: Cookie: session=abc123', 'error');
        }, 2500);

        setTimeout(() => {
            setStep(3);
            logMessage('📥 Server responds with data (plain text)', 'info');
            logMessage('✅ Request complete (but insecure!)', 'warning');
        }, 4000);

        setTimeout(() => setStep(0), 5500);
    };

    const runHttpsDemo = () => {
        setProtocol('https');
        setStep(0);
        setLogs([]);
        logMessage('🔒 Starting HTTPS Request (Secure)...', 'info');

        // Step 1: TLS Handshake
        setTimeout(() => {
            setStep(1);
            logMessage('🤝 Step 1: TLS Handshake initiated', 'info');
            logMessage('📋 Client Hello: Supported ciphers sent', 'info');
        }, 1000);

        setTimeout(() => {
            setStep(2);
            logMessage('📜 Step 2: Server sends SSL Certificate', 'info');
            logMessage('🔍 Verifying certificate with CA...', 'info');
        }, 2500);

        setTimeout(() => {
            setStep(3);
            logMessage('✅ Certificate verified! (Issued by: Let\'s Encrypt)', 'success');
            logMessage('🔑 Step 3: Exchanging encryption keys', 'info');
        }, 4000);

        setTimeout(() => {
            setStep(4);
            logMessage('🔐 Step 4: Symmetric key established', 'success');
            logMessage('📤 Sending encrypted request...', 'info');
        }, 5500);

        setTimeout(() => {
            setStep(5);
            logMessage('👁️ Hacker sees: *&^%$#@! (Encrypted gibberish)', 'success');
            logMessage('🛡️ Data is safe from eavesdropping!', 'success');
        }, 7000);

        setTimeout(() => {
            setStep(6);
            logMessage('📥 Server responds (encrypted)', 'info');
            logMessage('🔓 Decrypting response with shared key...', 'info');
            logMessage('✅ Secure transaction complete!', 'success');
        }, 8500);

        setTimeout(() => setStep(0), 10000);
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-orange-400 mb-2">HTTP vs HTTPS</h3>
                <p className="text-sm text-white/70">
                    HTTP (HyperText Transfer Protocol) web pages load karne ka protocol hai.
                    HTTPS uska secure version hai jo encryption use karta hai.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    HTTP (Insecure)
                </h4>

                <div className="bg-red-500/10 border-l-2 border-red-500 p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        <strong className="text-red-300 text-sm">Plain Text Communication</strong>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 ml-6 list-disc">
                        <li>No encryption - data visible to anyone</li>
                        <li>Port 80</li>
                        <li>Fast but insecure</li>
                        <li>Passwords, credit cards exposed!</li>
                        <li>Man-in-the-middle attacks possible</li>
                    </ul>
                </div>

                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2 mt-6">
                    HTTPS (Secure)
                </h4>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Lock size={16} className="text-green-400" />
                        <strong className="text-green-300 text-sm">Encrypted Communication</strong>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 ml-6 list-disc">
                        <li>TLS/SSL encryption (AES-256)</li>
                        <li>Port 443</li>
                        <li>Certificate verification</li>
                        <li>Data integrity guaranteed</li>
                        <li>Required for banking, shopping</li>
                    </ul>
                </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>🔒 Padlock Icon:</strong> Browser mein green padlock HTTPS ka sign hai.
                Kabhi bhi sensitive data HTTP par mat bhejo!
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">HTTP Methods:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">GET</strong>
                        <p className="text-white/50 text-[10px]">Fetch data</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-blue-400">POST</strong>
                        <p className="text-white/50 text-[10px]">Send data</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-yellow-400">PUT</strong>
                        <p className="text-white/50 text-[10px]">Update data</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-red-400">DELETE</strong>
                        <p className="text-white/50 text-[10px]">Remove data</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-3xl">
                {/* Protocol Selector */}
                <div className="flex gap-4 mb-8 justify-center">
                    <button
                        onClick={runHttpDemo}
                        disabled={step !== 0}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl font-bold text-white transition-all flex items-center gap-2"
                    >
                        <Globe size={18} /> Run HTTP
                    </button>
                    <button
                        onClick={runHttpsDemo}
                        disabled={step !== 0}
                        className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded-xl font-bold text-white transition-all flex items-center gap-2"
                    >
                        <Lock size={18} /> Run HTTPS
                    </button>
                </div>

                {/* Communication Diagram */}
                <div className="relative h-64 bg-black/20 rounded-xl border border-white/5 p-8">
                    {/* Client */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center
                            ${protocol === 'https' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'}
                        `}>
                            <Globe size={32} className={protocol === 'https' ? 'text-green-400' : 'text-red-400'} />
                        </div>
                        <span className="text-xs text-white/50 mt-2">Client (Browser)</span>
                    </div>

                    {/* Server */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center
                            ${protocol === 'https' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'}
                        `}>
                            <Shield size={32} className={protocol === 'https' ? 'text-green-400' : 'text-red-400'} />
                        </div>
                        <span className="text-xs text-white/50 mt-2">Server</span>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute left-28 right-28 top-1/2 -translate-y-1/2 h-1 bg-white/10" />

                    {/* Animated Packets */}
                    <AnimatePresence>
                        {step > 0 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{
                                    left: step % 2 === 1 ? '120px' : 'calc(100% - 120px)',
                                    transform: 'translateY(-50%)'
                                }}
                            >
                                <div className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg
                                    ${protocol === 'https'
                                        ? 'bg-green-500 text-black shadow-[0_0_20px_#22c55e]'
                                        : 'bg-red-500 text-white shadow-[0_0_20px_#ef4444]'}
                                `}>
                                    {protocol === 'https' ? '🔒 Encrypted' : '📄 Plain Text'}
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Hacker (only for HTTP) */}
                    {protocol === 'http' && step === 2 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center animate-pulse">
                                <span className="text-2xl">👁️</span>
                            </div>
                            <span className="text-xs text-purple-400 mt-1">Hacker watching!</span>
                        </div>
                    )}

                    {/* Hacker blocked (HTTPS) */}
                    {protocol === 'https' && step === 5 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                                <span className="text-2xl">🚫</span>
                            </div>
                            <span className="text-xs text-red-400 mt-1">Can't decrypt!</span>
                        </div>
                    )}
                </div>

                {/* Status Codes */}
                <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                        <strong className="text-green-400">200 OK</strong>
                        <p className="text-white/50 text-[10px] mt-1">Success</p>
                    </div>
                    <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                        <strong className="text-yellow-400">404 Not Found</strong>
                        <p className="text-white/50 text-[10px] mt-1">Page missing</p>
                    </div>
                    <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                        <strong className="text-red-400">500 Error</strong>
                        <p className="text-white/50 text-[10px] mt-1">Server crash</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Request Details</h4>
                <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                        <span className="text-white/50">Method:</span>
                        <span className="text-green-400">{requestData.method}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/50">URL:</span>
                        <span className="text-cyan-400">{requestData.url}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/50">Protocol:</span>
                        <span className={protocol === 'https' ? 'text-green-400' : 'text-red-400'}>
                            {protocol.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/50">Port:</span>
                        <span className="text-white">{protocol === 'https' ? '443' : '80'}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Transaction Log</span>
                    <Send size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click a protocol to start...</span>}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="text-white/70 border-l-2 border-orange-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Tip:</strong> Always check for 🔒 padlock before entering passwords!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="HTTP/HTTPS Protocol"
            subtitle="Module 4.2: Web Communication & Security"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default HttpScene;
