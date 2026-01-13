import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Globe, Home, ArrowRight, RefreshCw, Database, Wifi, Shield } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const NatScene = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [natTable, setNatTable] = useState([]);
    const [activeConnection, setActiveConnection] = useState(null);

    const logMessage = (msg, type = 'info') => {
        const icon = type === 'outgoing' ? '📤' : type === 'incoming' ? '📥' : type === 'nat' ? '🔄' : '📡';
        setLogs(prev => [`${icon} ${msg}`, ...prev].slice(0, 20));
    };

    const runNatDemo = () => {
        setStep(0);
        setLogs([]);
        setNatTable([]);
        setActiveConnection(null);

        logMessage('🏠 Device in private network wants to access internet...', 'info');
        logMessage('📱 Source: 192.168.1.100:5000 (Private IP)', 'info');

        // Step 1: Outgoing packet
        setTimeout(() => {
            setStep(1);
            logMessage('📤 OUTGOING: Packet sent to router', 'outgoing');
            logMessage('From: 192.168.1.100:5000', 'outgoing');
            logMessage('To: 8.8.8.8:80 (Google DNS)', 'outgoing');
            setActiveConnection({
                privateIP: '192.168.1.100',
                privatePort: '5000',
                publicIP: '203.0.113.5',
                publicPort: '12345',
                destination: '8.8.8.8:80'
            });
        }, 1500);

        // Step 2: NAT Translation
        setTimeout(() => {
            setStep(2);
            logMessage('🔄 NAT TRANSLATION at Router', 'nat');
            logMessage('Replacing source IP & Port...', 'nat');
            logMessage('Old: 192.168.1.100:5000 (Private)', 'nat');
            logMessage('New: 203.0.113.5:12345 (Public)', 'nat');

            // Add to NAT table
            setNatTable([{
                privateIP: '192.168.1.100',
                privatePort: '5000',
                publicIP: '203.0.113.5',
                publicPort: '12345',
                destination: '8.8.8.8:80',
                protocol: 'TCP',
                state: 'active'
            }]);
        }, 3500);

        // Step 3: Send to internet
        setTimeout(() => {
            setStep(3);
            logMessage('🌐 Packet sent to Internet', 'outgoing');
            logMessage('From: 203.0.113.5:12345 (Public IP)', 'outgoing');
            logMessage('To: 8.8.8.8:80', 'outgoing');
            logMessage('✅ Internet sees only public IP!', 'info');
        }, 5500);

        // Step 4: Response comes back
        setTimeout(() => {
            setStep(4);
            logMessage('📥 INCOMING: Response from server', 'incoming');
            logMessage('From: 8.8.8.8:80', 'incoming');
            logMessage('To: 203.0.113.5:12345 (Public IP)', 'incoming');
        }, 7500);

        // Step 5: Reverse NAT
        setTimeout(() => {
            setStep(5);
            logMessage('🔄 REVERSE NAT at Router', 'nat');
            logMessage('Looking up NAT table...', 'nat');
            logMessage('Port 12345 → 192.168.1.100:5000', 'nat');
            logMessage('Replacing destination IP & Port...', 'nat');
        }, 9500);

        // Step 6: Deliver to device
        setTimeout(() => {
            setStep(6);
            logMessage('📥 Packet delivered to device', 'incoming');
            logMessage('To: 192.168.1.100:5000', 'incoming');
            logMessage('✅ Communication complete!', 'info');
            logMessage('💡 Device used private IP, internet saw public IP', 'info');
        }, 11500);

        setTimeout(() => setStep(0), 14000);
    };

    const showPortForwarding = () => {
        setLogs([]);
        logMessage('🎮 PORT FORWARDING Demo', 'info');
        logMessage('Scenario: Running game server on 192.168.1.50:25565', 'info');

        setTimeout(() => {
            logMessage('⚙️ Configuring port forwarding rule...', 'nat');
            logMessage('External Port: 25565 → Internal: 192.168.1.50:25565', 'nat');

            setNatTable([{
                privateIP: '192.168.1.50',
                privatePort: '25565',
                publicIP: '203.0.113.5',
                publicPort: '25565',
                destination: 'Any',
                protocol: 'TCP',
                state: 'forwarded'
            }]);
        }, 1500);

        setTimeout(() => {
            logMessage('🌐 External player connects to 203.0.113.5:25565', 'incoming');
            logMessage('🔄 Router forwards to 192.168.1.50:25565', 'nat');
            logMessage('✅ Game server accessible from internet!', 'info');
        }, 3500);
    };

    const showNatTypes = () => {
        setLogs([]);
        logMessage('📚 NAT Types Overview', 'info');

        setTimeout(() => {
            logMessage('1️⃣ STATIC NAT: One-to-one mapping', 'info');
            logMessage('   192.168.1.10 ↔ 203.0.113.10 (permanent)', 'info');
        }, 1000);

        setTimeout(() => {
            logMessage('2️⃣ DYNAMIC NAT: Pool of public IPs', 'info');
            logMessage('   192.168.1.x → 203.0.113.5-10 (temporary)', 'info');
        }, 2500);

        setTimeout(() => {
            logMessage('3️⃣ PAT (NAT Overload): Most common!', 'info');
            logMessage('   Multiple private IPs → 1 public IP (different ports)', 'info');
            logMessage('   This is what home routers use! 🏠', 'info');
        }, 4000);
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-orange-400 mb-2">NAT - Network Address Translation</h3>
                <p className="text-sm text-white/70">
                    Private IP addresses ko Public IP mein convert karta hai. Iske bina ghar ka WiFi internet access nahi kar sakta! 🌐
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Why NAT is Needed
                </h4>

                <div className="bg-red-500/10 border-l-2 border-red-500 p-3">
                    <strong className="text-red-300 text-sm block mb-1">The Problem</strong>
                    <p className="text-xs text-white/60">
                        IPv4 addresses limited hain (4.3 billion). Har device ko public IP dena impossible hai.
                        Private IPs (192.168.x.x) internet par nahi chal sakte.
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">The Solution</strong>
                    <p className="text-xs text-white/60">
                        NAT router private IPs ko ek public IP mein convert karta hai.
                        Saare ghar ke devices ek hi public IP share karte hain!
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    How NAT Works
                </h4>

                <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">1.</span>
                        <div>
                            <strong className="text-blue-300">Outgoing Packet</strong>
                            <p className="text-white/60">Device sends packet with private IP</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">2.</span>
                        <div>
                            <strong className="text-purple-300">NAT Translation</strong>
                            <p className="text-white/60">Router replaces private IP with public IP</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">3.</span>
                        <div>
                            <strong className="text-green-300">NAT Table Entry</strong>
                            <p className="text-white/60">Router remembers the mapping</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-orange-400 font-bold">4.</span>
                        <div>
                            <strong className="text-orange-300">Reverse Translation</strong>
                            <p className="text-white/60">Response ko wapas private IP par bhejo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Fun Fact:</strong> Aapke ghar mein 10 devices ho sakte hain,
                lekin internet ko sirf 1 public IP dikhta hai!
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">NAT Types:</h4>
                <div className="space-y-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-cyan-400">Static NAT</strong>
                        <p className="text-white/50 text-[10px]">1 private ↔ 1 public (permanent)</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-purple-400">Dynamic NAT</strong>
                        <p className="text-white/50 text-[10px]">Pool of public IPs (temporary)</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">PAT (Overload)</strong>
                        <p className="text-white/50 text-[10px]">Many private → 1 public (ports)</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* NAT Process Visualization */}
                <div className="relative h-80 bg-black/20 rounded-xl border border-white/5 p-8">
                    {/* Private Network (Left) */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 w-32">
                            <Home size={24} className="text-blue-400 mx-auto mb-2" />
                            <div className="text-xs text-center text-blue-300 font-bold mb-2">Private Network</div>
                            <div className="space-y-1">
                                <div className={`text-[10px] font-mono p-1 rounded text-center ${step >= 1 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-white/50'
                                    }`}>
                                    192.168.1.100
                                </div>
                                <div className="text-[10px] font-mono bg-white/5 text-white/50 p-1 rounded text-center">
                                    192.168.1.101
                                </div>
                                <div className="text-[10px] font-mono bg-white/5 text-white/50 p-1 rounded text-center">
                                    192.168.1.102
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NAT Router (Center) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${step === 2 || step === 5
                                ? 'border-orange-500 bg-orange-500/20 shadow-[0_0_30px_#f97316]'
                                : 'border-purple-500 bg-purple-500/20'
                            }`}>
                            <RefreshCw size={32} className={`${step === 2 || step === 5 ? 'text-orange-400 animate-spin' : 'text-purple-400'}`} />
                            <span className="text-xs text-white/70 mt-2">NAT Router</span>
                        </div>
                        <div className="mt-2 text-center">
                            <div className="text-[10px] text-white/50">Public IP:</div>
                            <div className="text-xs font-mono text-orange-400">203.0.113.5</div>
                        </div>
                    </div>

                    {/* Internet (Right) */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all ${step >= 3 ? 'border-green-500 bg-green-500/20 shadow-[0_0_20px_#22c55e]' : 'border-gray-500 bg-gray-500/20'
                            }`}>
                            <Globe size={32} className={step >= 3 ? 'text-green-400' : 'text-gray-400'} />
                        </div>
                        <div className="mt-2 text-center">
                            <div className="text-xs text-green-400 font-bold">Internet</div>
                            <div className="text-[10px] font-mono text-white/50">8.8.8.8</div>
                        </div>
                    </div>

                    {/* Animated Packets */}
                    <AnimatePresence>
                        {/* Outgoing (Private → Router) */}
                        {step === 1 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ left: '180px' }}
                            >
                                <div className="px-3 py-2 rounded-lg bg-blue-500 text-white font-bold text-xs shadow-[0_0_20px_#3b82f6]">
                                    📤 Private IP
                                </div>
                            </div>
                        )}

                        {/* Outgoing (Router → Internet) */}
                        {step === 3 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ right: '180px' }}
                            >
                                <div className="px-3 py-2 rounded-lg bg-orange-500 text-white font-bold text-xs shadow-[0_0_20px_#f97316]">
                                    🌐 Public IP
                                </div>
                            </div>
                        )}

                        {/* Incoming (Internet → Router) */}
                        {step === 4 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ right: '180px' }}
                            >
                                <div className="px-3 py-2 rounded-lg bg-green-500 text-black font-bold text-xs shadow-[0_0_20px_#22c55e]">
                                    📥 Response
                                </div>
                            </div>
                        )}

                        {/* Incoming (Router → Device) */}
                        {step === 6 && (
                            <div
                                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
                                style={{ left: '180px' }}
                            >
                                <div className="px-3 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs shadow-[0_0_20px_#06b6d4]">
                                    ✅ Delivered
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Step Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((s) => (
                            <div
                                key={s}
                                className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-orange-500 scale-125' : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* NAT Translation Table */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Database size={16} className="text-orange-400" />
                            NAT Translation Table
                        </h4>
                        <span className="text-xs text-white/50">Active Mappings</span>
                    </div>
                    {natTable.length === 0 ? (
                        <div className="text-center text-white/30 text-xs py-4">
                            No active translations. Click "Run NAT Demo" to see mappings.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-2 px-2 text-white/50">Private IP:Port</th>
                                        <th className="text-center py-2 px-2 text-white/50">↔</th>
                                        <th className="text-left py-2 px-2 text-white/50">Public IP:Port</th>
                                        <th className="text-left py-2 px-2 text-white/50">Destination</th>
                                        <th className="text-left py-2 px-2 text-white/50">State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {natTable.map((entry, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="py-2 px-2 font-mono text-blue-400">
                                                {entry.privateIP}:{entry.privatePort}
                                            </td>
                                            <td className="py-2 px-2 text-center text-orange-400">
                                                <ArrowRight size={14} className="mx-auto" />
                                            </td>
                                            <td className="py-2 px-2 font-mono text-orange-400">
                                                {entry.publicIP}:{entry.publicPort}
                                            </td>
                                            <td className="py-2 px-2 font-mono text-green-400">{entry.destination}</td>
                                            <td className="py-2 px-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] ${entry.state === 'active' ? 'bg-green-500/20 text-green-300' :
                                                        entry.state === 'forwarded' ? 'bg-purple-500/20 text-purple-300' :
                                                            'bg-blue-500/20 text-blue-300'
                                                    }`}>
                                                    {entry.state}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <button
                onClick={runNatDemo}
                disabled={step !== 0 && step !== 6}
                className="py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <RefreshCw size={18} /> Run NAT Demo
            </button>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={showPortForwarding}
                    className="py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Wifi size={14} /> Port Forward
                </button>
                <button
                    onClick={showNatTypes}
                    className="py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Database size={14} /> NAT Types
                </button>
            </div>

            {activeConnection && (
                <div className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/30">
                    <h4 className="text-xs font-bold text-orange-300 mb-2">Active Connection</h4>
                    <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                            <span className="text-white/50">Private:</span>
                            <span className="text-blue-400">{activeConnection.privateIP}:{activeConnection.privatePort}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/50">Public:</span>
                            <span className="text-orange-400">{activeConnection.publicIP}:{activeConnection.publicPort}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/50">To:</span>
                            <span className="text-green-400">{activeConnection.destination}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>NAT Transaction Log</span>
                    <Shield size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click a button to start...</span>}
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
                <strong>💡 Did You Know:</strong> NAT is why IPv4 is still working despite address exhaustion!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="NAT - Network Address Translation"
            subtitle="Ch 15: Private to Public IP Conversion"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default NatScene;
