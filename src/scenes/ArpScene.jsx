import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Wifi, Search, Database, ArrowRight, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const ArpScene = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [arpCache, setArpCache] = useState([
        { ip: '192.168.1.1', mac: 'aa:bb:cc:dd:ee:01', type: 'static', age: 'permanent' },
        { ip: '192.168.1.10', mac: 'aa:bb:cc:dd:ee:10', type: 'dynamic', age: '120s' },
    ]);
    const [targetIP, setTargetIP] = useState('192.168.1.50');
    const [resolvedMAC, setResolvedMAC] = useState(null);

    const logMessage = (msg, type = 'info') => {
        const icon = type === 'request' ? '📢' : type === 'reply' ? '✅' : type === 'cache' ? '💾' : '📡';
        setLogs(prev => [`${icon} ${msg}`, ...prev].slice(0, 20));
    };

    const runArpResolution = () => {
        setStep(0);
        setLogs([]);
        setResolvedMAC(null);

        logMessage('🖥️ Application wants to send data to ' + targetIP, 'info');
        logMessage('🔍 Checking ARP cache...', 'cache');

        // Step 1: Check cache
        setTimeout(() => {
            setStep(1);
            const cached = arpCache.find(entry => entry.ip === targetIP);

            if (cached) {
                logMessage(`✅ Cache HIT! Found MAC: ${cached.mac}`, 'cache');
                logMessage('📤 Using cached MAC address', 'cache');
                setResolvedMAC(cached.mac);
                setStep(5);
            } else {
                logMessage('❌ Cache MISS! MAC address not found', 'cache');
                logMessage('📢 Broadcasting ARP Request...', 'request');
                setStep(2);
            }
        }, 1500);

        // Step 2: ARP Request (if cache miss)
        setTimeout(() => {
            if (step !== 5) {
                logMessage(`📢 ARP Request: "Who has ${targetIP}? Tell 192.168.1.100"`, 'request');
                logMessage('🌐 Broadcast to: ff:ff:ff:ff:ff:ff (everyone)', 'request');
                setStep(3);
            }
        }, 3500);

        // Step 3: Target responds
        setTimeout(() => {
            if (step !== 5) {
                const newMAC = 'aa:bb:cc:dd:ee:50';
                logMessage(`✅ ARP Reply from ${targetIP}`, 'reply');
                logMessage(`📬 "I am ${targetIP}, my MAC is ${newMAC}"`, 'reply');
                setResolvedMAC(newMAC);
                setStep(4);
            }
        }, 5500);

        // Step 4: Update cache
        setTimeout(() => {
            if (step !== 5) {
                const newMAC = 'aa:bb:cc:dd:ee:50';
                logMessage('💾 Updating ARP cache...', 'cache');
                setArpCache(prev => [...prev, {
                    ip: targetIP,
                    mac: newMAC,
                    type: 'dynamic',
                    age: '0s'
                }]);
                logMessage('✅ Cache updated! Future lookups will be instant', 'cache');
                setStep(5);
            }
        }, 7500);

        // Complete
        setTimeout(() => {
            logMessage('🎉 ARP Resolution Complete!', 'info');
            logMessage('📤 Data can now be sent using MAC address', 'info');
        }, 9000);

        setTimeout(() => setStep(0), 11000);
    };

    const clearCache = () => {
        setLogs([]);
        logMessage('🗑️ Clearing ARP cache...', 'cache');
        setTimeout(() => {
            setArpCache([
                { ip: '192.168.1.1', mac: 'aa:bb:cc:dd:ee:01', type: 'static', age: 'permanent' },
            ]);
            setResolvedMAC(null);
            logMessage('✅ Cache cleared! Only static entries remain', 'cache');
        }, 500);
    };

    const arpSpoofingDemo = () => {
        setLogs([]);
        logMessage('⚠️ SECURITY DEMO: ARP Spoofing Attack', 'info');

        setTimeout(() => {
            logMessage('👤 Legitimate device: 192.168.1.1 = aa:bb:cc:dd:ee:01', 'info');
        }, 1000);

        setTimeout(() => {
            logMessage('🦹 Attacker sends fake ARP reply...', 'request');
            logMessage('📢 "I am 192.168.1.1, my MAC is 99:99:99:99:99:99"', 'request');
        }, 2500);

        setTimeout(() => {
            logMessage('💾 Victim updates cache with fake MAC!', 'cache');
            setArpCache(prev => prev.map(entry =>
                entry.ip === '192.168.1.1'
                    ? { ...entry, mac: '99:99:99:99:99:99', type: 'poisoned' }
                    : entry
            ));
        }, 4000);

        setTimeout(() => {
            logMessage('⚠️ All traffic now goes to attacker!', 'info');
            logMessage('🛡️ Defense: Use static ARP entries or ARP inspection', 'info');
        }, 5500);
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-green-400 mb-2">ARP - Address Resolution Protocol</h3>
                <p className="text-sm text-white/70">
                    IP address (Layer 3) ko MAC address (Layer 2) mein convert karta hai.
                    Bina ARP ke, data send karna impossible hai! 🔄
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Why ARP is Needed
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">The Problem</strong>
                    <p className="text-xs text-white/60">
                        Application knows IP address (192.168.1.50) but Ethernet frame needs MAC address.
                        Kaise pata chalega kis device ka MAC hai?
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">The Solution</strong>
                    <p className="text-xs text-white/60">
                        ARP broadcast karke poochta hai: "Who has this IP?"
                        Target device reply karta hai: "I have it, my MAC is..."
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    ARP Process
                </h4>

                <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">1.</span>
                        <div>
                            <strong className="text-cyan-300">Check Cache</strong>
                            <p className="text-white/60">Pehle ARP cache mein dekho</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">2.</span>
                        <div>
                            <strong className="text-purple-300">Broadcast Request</strong>
                            <p className="text-white/60">Agar nahi mila, sabko pooch lo</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">3.</span>
                        <div>
                            <strong className="text-green-300">Receive Reply</strong>
                            <p className="text-white/60">Target device apna MAC bhejta hai</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-orange-400 font-bold">4.</span>
                        <div>
                            <strong className="text-orange-300">Update Cache</strong>
                            <p className="text-white/60">Future ke liye save kar lo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-red-900/20 p-4 rounded text-xs text-red-200 border border-red-500/30">
                <strong>⚠️ Security Risk:</strong> ARP has no authentication!
                Attacker fake ARP replies bhej sakta hai (ARP Spoofing/Poisoning).
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">ARP Cache Types:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">Static</strong>
                        <p className="text-white/50 text-[10px]">Manual, permanent</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-blue-400">Dynamic</strong>
                        <p className="text-white/50 text-[10px]">Auto, expires (2-20 min)</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* ARP Process Visualization */}
                <div className="relative h-80 bg-black/20 rounded-xl border border-white/5 p-8">
                    {/* Source Device (Left) */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all
                            ${step >= 1 ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_20px_#06b6d4]' : 'border-blue-500 bg-blue-500/20'}
                        `}>
                            <Wifi size={32} className="text-cyan-400" />
                            <span className="text-[10px] text-white/70 mt-1">Source</span>
                        </div>
                        <div className="mt-2 text-center">
                            <div className="text-xs text-cyan-400 font-mono">192.168.1.100</div>
                            <div className="text-[10px] text-white/50 font-mono">aa:bb:cc:dd:ee:ff</div>
                        </div>
                    </div>

                    {/* Target Device (Right) */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all
                            ${step >= 3 ? 'border-green-500 bg-green-500/20 shadow-[0_0_20px_#22c55e]' : 'border-gray-500 bg-gray-500/20'}
                        `}>
                            <Wifi size={32} className={step >= 3 ? 'text-green-400' : 'text-gray-400'} />
                            <span className="text-[10px] text-white/70 mt-1">Target</span>
                        </div>
                        <div className="mt-2 text-center">
                            <div className="text-xs text-green-400 font-mono">{targetIP}</div>
                            {resolvedMAC && (
                                <div className="text-[10px] text-white/50 font-mono">{resolvedMAC}</div>
                            )}
                        </div>
                    </div>

                    {/* Broadcast Cloud (Center) */}
                    {step === 2 && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-32 h-32 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center animate-pulse">
                                <div className="text-center">
                                    <Search size={32} className="text-purple-400 mx-auto mb-1" />
                                    <div className="text-xs text-purple-300">Broadcasting...</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Animated Messages */}
                    <AnimatePresence>
                        {/* ARP Request */}
                        {step === 2 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ left: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-purple-500 text-white font-bold text-xs shadow-[0_0_20px_#a855f7]">
                                    📢 ARP Request
                                </div>
                            </div>
                        )}

                        {/* ARP Reply */}
                        {step === 4 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ right: '140px' }}
                            >
                                <div className="px-4 py-2 rounded-full bg-green-500 text-black font-bold text-xs shadow-[0_0_20px_#22c55e]">
                                    ✅ ARP Reply
                                </div>
                            </div>
                        )}

                        {/* Cache Hit */}
                        {step === 1 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="px-6 py-3 rounded-xl bg-cyan-500/20 border-2 border-cyan-500 text-cyan-300 font-bold text-sm shadow-[0_0_30px_#06b6d4]">
                                    💾 Cache HIT!
                                </div>
                            </div>
                        )}

                        {/* Complete */}
                        {step === 5 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="px-6 py-3 rounded-xl bg-green-500/20 border-2 border-green-500 text-green-300 font-bold text-sm shadow-[0_0_30px_#22c55e]">
                                    🎉 Resolved!
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Step Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-green-500 scale-125' : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ARP Cache Table */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Database size={16} className="text-green-400" />
                            ARP Cache Table
                        </h4>
                        <span className="text-xs text-white/50">Timeout: 120s</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-2 px-3 text-white/50">IP Address</th>
                                    <th className="text-left py-2 px-3 text-white/50">MAC Address</th>
                                    <th className="text-left py-2 px-3 text-white/50">Type</th>
                                    <th className="text-left py-2 px-3 text-white/50">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arpCache.map((entry, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-2 px-3 font-mono text-cyan-400">{entry.ip}</td>
                                        <td className="py-2 px-3 font-mono text-green-400">{entry.mac}</td>
                                        <td className="py-2 px-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] ${entry.type === 'static' ? 'bg-green-500/20 text-green-300' :
                                                    entry.type === 'poisoned' ? 'bg-red-500/20 text-red-300' :
                                                        'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                {entry.type}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-white/70">{entry.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <label className="text-xs text-white/50 block mb-2">Target IP Address:</label>
                <input
                    type="text"
                    value={targetIP}
                    onChange={(e) => setTargetIP(e.target.value)}
                    placeholder="192.168.1.50"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
            </div>

            <button
                onClick={runArpResolution}
                disabled={step !== 0 && step !== 5}
                className="py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <Search size={18} /> Resolve ARP
            </button>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={clearCache}
                    className="py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <RefreshCw size={14} /> Clear Cache
                </button>
                <button
                    onClick={arpSpoofingDemo}
                    className="py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <AlertTriangle size={14} /> Spoofing
                </button>
            </div>

            {resolvedMAC && (
                <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/30">
                    <h4 className="text-xs font-bold text-green-300 mb-2">Resolved!</h4>
                    <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                            <span className="text-white/50">IP:</span>
                            <span className="text-cyan-400">{targetIP}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/50">MAC:</span>
                            <span className="text-green-400">{resolvedMAC}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>ARP Transaction Log</span>
                    <Database size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Enter IP and click Resolve...</span>}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="text-white/70 border-l-2 border-green-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Pro Tip:</strong> Use static ARP entries for critical servers to prevent spoofing!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="ARP - Address Resolution"
            subtitle="Module 5.1: IP to MAC Address Mapping"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default ArpScene;
