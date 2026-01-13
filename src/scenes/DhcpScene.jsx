import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Wifi, Server, Laptop, CheckCircle, Clock, RefreshCw, Activity, Database } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const DhcpScene = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [clientIP, setClientIP] = useState(null);
    const [leaseTime, setLeaseTime] = useState(null);
    const [ipPool, setIpPool] = useState([
        { ip: '192.168.1.100', status: 'available' },
        { ip: '192.168.1.101', status: 'available' },
        { ip: '192.168.1.102', status: 'available' },
        { ip: '192.168.1.103', status: 'available' },
        { ip: '192.168.1.104', status: 'available' },
    ]);

    const logMessage = (msg, type = 'info') => {
        const icon = type === 'success' ? '✅' : type === 'discover' ? '🔍' : type === 'offer' ? '📋' : type === 'request' ? '🙏' : type === 'ack' ? '✅' : '📡';
        setLogs(prev => [`${icon} ${msg}`, ...prev].slice(0, 20));
    };

    const runDhcpProcess = () => {
        setStep(0);
        setLogs([]);
        setClientIP(null);
        setLeaseTime(null);

        // Reset IP pool
        setIpPool(prev => prev.map(ip => ({ ...ip, status: 'available' })));

        logMessage('🖥️ New device connected to network...', 'info');
        logMessage('⚡ Device needs an IP address to communicate', 'info');

        // Step 1: DISCOVER
        setTimeout(() => {
            setStep(1);
            logMessage('📢 STEP 1: DHCP DISCOVER', 'discover');
            logMessage('Client broadcasts: "Is there a DHCP server here?"', 'discover');
            logMessage('Broadcast to: 255.255.255.255 (everyone on network)', 'discover');
        }, 1500);

        // Step 2: OFFER
        setTimeout(() => {
            setStep(2);
            const availableIP = ipPool.find(ip => ip.status === 'available');
            logMessage('📋 STEP 2: DHCP OFFER', 'offer');
            logMessage(`Server responds: "Yes! I can offer you ${availableIP.ip}"`, 'offer');
            logMessage('Offer includes: IP, Subnet Mask, Gateway, DNS', 'offer');
            setIpPool(prev => prev.map(ip =>
                ip.ip === availableIP.ip ? { ...ip, status: 'offered' } : ip
            ));
        }, 3500);

        // Step 3: REQUEST
        setTimeout(() => {
            setStep(3);
            const offeredIP = ipPool.find(ip => ip.status === 'offered');
            logMessage('🙏 STEP 3: DHCP REQUEST', 'request');
            logMessage(`Client broadcasts: "I want ${offeredIP.ip}, please!"`, 'request');
            logMessage('Broadcasting to confirm with all DHCP servers', 'request');
        }, 5500);

        // Step 4: ACKNOWLEDGE
        setTimeout(() => {
            setStep(4);
            const requestedIP = ipPool.find(ip => ip.status === 'offered');
            const lease = '24 hours';
            setClientIP(requestedIP.ip);
            setLeaseTime(lease);
            logMessage('✅ STEP 4: DHCP ACKNOWLEDGE', 'ack');
            logMessage(`Server confirms: "${requestedIP.ip} is yours!"`, 'ack');
            logMessage(`Lease time: ${lease}`, 'ack');
            logMessage('Additional info sent:', 'ack');
            logMessage('  - Subnet Mask: 255.255.255.0', 'ack');
            logMessage('  - Default Gateway: 192.168.1.1', 'ack');
            logMessage('  - DNS Server: 8.8.8.8', 'ack');
            setIpPool(prev => prev.map(ip =>
                ip.ip === requestedIP.ip ? { ...ip, status: 'leased' } : ip
            ));
        }, 7500);

        // Step 5: Complete
        setTimeout(() => {
            setStep(5);
            logMessage('🎉 IP Configuration Complete!', 'success');
            logMessage('Device can now communicate on network', 'success');
            logMessage('Lease will auto-renew at 50% (12 hours)', 'info');
        }, 9500);

        setTimeout(() => setStep(0), 12000);
    };

    const renewLease = () => {
        setLogs([]);
        logMessage('🔄 Lease Renewal Process Started...', 'info');
        logMessage(`Current IP: ${clientIP}`, 'info');

        setTimeout(() => {
            logMessage('📤 Sending renewal request to DHCP server', 'request');
        }, 1000);

        setTimeout(() => {
            logMessage('✅ Lease renewed successfully!', 'success');
            logMessage('New lease time: 24 hours', 'success');
        }, 2500);
    };

    const releaseLease = () => {
        setLogs([]);
        logMessage('🔓 Releasing IP address...', 'info');

        setTimeout(() => {
            logMessage(`📤 Informing server: Releasing ${clientIP}`, 'info');
            setIpPool(prev => prev.map(ip =>
                ip.ip === clientIP ? { ...ip, status: 'available' } : ip
            ));
        }, 1000);

        setTimeout(() => {
            logMessage('✅ IP address released back to pool', 'success');
            setClientIP(null);
            setLeaseTime(null);
        }, 2000);
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-purple-400 mb-2">DHCP - Dynamic Host Configuration Protocol</h3>
                <p className="text-sm text-white/70">
                    Jab bhi aap WiFi connect karte ho, automatically IP address milta hai.
                    Yeh DHCP ka kamal hai! Manual configuration ki zaroorat nahi.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    The DORA Process
                </h4>

                <div className="space-y-3">
                    <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">🔍</span>
                            <strong className="text-blue-300 text-sm">D - Discover</strong>
                        </div>
                        <p className="text-xs text-white/60 ml-8">
                            Client broadcasts: "Koi DHCP server hai?"
                        </p>
                    </div>

                    <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">📋</span>
                            <strong className="text-green-300 text-sm">O - Offer</strong>
                        </div>
                        <p className="text-xs text-white/60 ml-8">
                            Server responds: "Haan! Yeh IP le lo"
                        </p>
                    </div>

                    <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">🙏</span>
                            <strong className="text-yellow-300 text-sm">R - Request</strong>
                        </div>
                        <p className="text-xs text-white/60 ml-8">
                            Client broadcasts: "Main yeh IP lunga"
                        </p>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">✅</span>
                            <strong className="text-purple-300 text-sm">A - Acknowledge</strong>
                        </div>
                        <p className="text-xs text-white/60 ml-8">
                            Server confirms: "Done! Tumhara IP ready"
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>💡 Why DHCP?</strong> Imagine 100 devices - manually configure karna nightmare hoga!
                DHCP automatically sab manage karta hai.
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">DHCP Provides:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-cyan-400">IP Address</strong>
                        <p className="text-white/50 text-[10px]">192.168.1.x</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">Subnet Mask</strong>
                        <p className="text-white/50 text-[10px]">255.255.255.0</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-blue-400">Gateway</strong>
                        <p className="text-white/50 text-[10px]">Router IP</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-purple-400">DNS Server</strong>
                        <p className="text-white/50 text-[10px]">8.8.8.8</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl">
                {/* DORA Process Visualization */}
                <div className="relative h-80 bg-black/20 rounded-xl border border-white/5 p-8 mb-6">
                    {/* Client (Left) */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-500
                            ${step >= 4 ? 'border-green-500 bg-green-500/20 shadow-[0_0_30px_#22c55e]' : 'border-blue-500 bg-blue-500/20'}
                        `}>
                            <Laptop size={40} className={step >= 4 ? 'text-green-400' : 'text-blue-400'} />
                        </div>
                        <span className="text-xs text-white/50 mt-2">Client Device</span>
                        {clientIP && (
                            <div className="mt-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/50">
                                <span className="text-xs font-mono text-green-300">{clientIP}</span>
                            </div>
                        )}
                    </div>

                    {/* DHCP Server (Right) */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all
                            ${step > 0 ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_20px_#a855f7]' : 'border-gray-500 bg-gray-500/20'}
                        `}>
                            <Server size={40} className={step > 0 ? 'text-purple-400' : 'text-gray-400'} />
                        </div>
                        <span className="text-xs text-white/50 mt-2">DHCP Server</span>
                        <span className="text-xs text-purple-400 mt-1 font-mono">192.168.1.1</span>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute left-32 right-32 top-1/2 -translate-y-1/2 h-0.5 bg-white/10" />

                    {/* Animated Messages */}
                    <AnimatePresence>
                        {/* DISCOVER */}
                        {step === 1 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ left: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-blue-500 text-white font-bold text-xs shadow-[0_0_20px_#3b82f6]">
                                    🔍 DISCOVER
                                </div>
                            </div>
                        )}

                        {/* OFFER */}
                        {step === 2 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ right: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-green-500 text-black font-bold text-xs shadow-[0_0_20px_#22c55e]">
                                    📋 OFFER
                                </div>
                            </div>
                        )}

                        {/* REQUEST */}
                        {step === 3 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ left: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-yellow-500 text-black font-bold text-xs shadow-[0_0_20px_#eab308]">
                                    🙏 REQUEST
                                </div>
                            </div>
                        )}

                        {/* ACKNOWLEDGE */}
                        {step === 4 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ right: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-purple-500 text-white font-bold text-xs shadow-[0_0_20px_#a855f7]">
                                    ✅ ACK
                                </div>
                            </div>
                        )}

                        {/* Success */}
                        {step === 5 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="px-6 py-3 rounded-xl bg-green-500/20 border-2 border-green-500 text-green-300 font-bold text-sm shadow-[0_0_30px_#22c55e]">
                                    🎉 Connected!
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Step Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-purple-500 scale-125' : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* IP Pool Status */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Database size={16} className="text-purple-400" />
                            DHCP IP Pool
                        </h4>
                        <span className="text-xs text-white/50">Range: 192.168.1.100-104</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {ipPool.map((ip) => (
                            <div
                                key={ip.ip}
                                className={`p-2 rounded text-center transition-all ${ip.status === 'available' ? 'bg-green-500/10 border border-green-500/30' :
                                        ip.status === 'offered' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                                            'bg-red-500/10 border border-red-500/30'
                                    }`}
                            >
                                <div className="text-[10px] font-mono text-white/70">{ip.ip.split('.').pop()}</div>
                                <div className={`text-[8px] mt-1 ${ip.status === 'available' ? 'text-green-400' :
                                        ip.status === 'offered' ? 'text-yellow-400' :
                                            'text-red-400'
                                    }`}>
                                    {ip.status === 'available' ? '✓ Free' : ip.status === 'offered' ? '⏳ Offered' : '🔒 Leased'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <button
                onClick={runDhcpProcess}
                disabled={step !== 0 && step !== 5}
                className="py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <Wifi size={18} /> Run DHCP Process
            </button>

            {clientIP && (
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={renewLease}
                        className="py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <RefreshCw size={14} /> Renew
                    </button>
                    <button
                        onClick={releaseLease}
                        className="py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <Clock size={14} /> Release
                    </button>
                </div>
            )}

            {clientIP && leaseTime && (
                <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/30">
                    <h4 className="text-xs font-bold text-green-300 mb-2">Current Lease</h4>
                    <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                            <span className="text-white/50">IP:</span>
                            <span className="text-green-400">{clientIP}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/50">Lease:</span>
                            <span className="text-white">{leaseTime}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>DHCP Transaction Log</span>
                    <Activity size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click button to start DHCP process...</span>}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="text-white/70 border-l-2 border-purple-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Fun Fact:</strong> DHCP lease typically renews at 50% time (T1) automatically!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="DHCP - IP Assignment"
            subtitle="Module 4.3: Automatic Network Configuration"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default DhcpScene;
