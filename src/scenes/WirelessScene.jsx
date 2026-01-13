import React, { useState } from 'react';
import { Wifi, Radio, Lock, Unlock, Signal, Users, Shield } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const WirelessScene = ({ onBack }) => {
    const [selectedStandard, setSelectedStandard] = useState('802.11ac');
    const [securityMode, setSecurityMode] = useState('WPA3');
    const [signalStrength, setSignalStrength] = useState(75);
    const [logs, setLogs] = useState([]);

    const standards = [
        { id: '802.11b', year: '1999', speed: '11 Mbps', freq: '2.4 GHz', range: 'Good' },
        { id: '802.11g', year: '2003', speed: '54 Mbps', freq: '2.4 GHz', range: 'Good' },
        { id: '802.11n', year: '2009', speed: '600 Mbps', freq: '2.4/5 GHz', range: 'Better' },
        { id: '802.11ac', year: '2013', speed: '1.3 Gbps', freq: '5 GHz', range: 'Best' },
        { id: '802.11ax (WiFi 6)', year: '2019', speed: '9.6 Gbps', freq: '2.4/5/6 GHz', range: 'Excellent' }
    ];

    const securityModes = [
        { id: 'Open', level: 'None', color: 'red', secure: false },
        { id: 'WEP', level: 'Weak', color: 'orange', secure: false },
        { id: 'WPA', level: 'Medium', color: 'yellow', secure: false },
        { id: 'WPA2', level: 'Strong', color: 'green', secure: true },
        { id: 'WPA3', level: 'Strongest', color: 'blue', secure: true }
    ];

    const logMessage = (msg) => {
        setLogs(prev => [`• ${msg}`, ...prev].slice(0, 10));
    };

    const demonstrateHandshake = () => {
        setLogs([]);
        logMessage('📱 Client scanning for WiFi networks...');
        setTimeout(() => logMessage('📡 Found: "MyNetwork" (SSID)'), 500);
        setTimeout(() => logMessage('🔐 Security: WPA3-Personal'), 1000);
        setTimeout(() => logMessage('🤝 Sending connection request...'), 1500);
        setTimeout(() => logMessage('🔑 4-Way Handshake initiated'), 2000);
        setTimeout(() => logMessage('✅ Authentication successful!'), 2500);
        setTimeout(() => logMessage('🌐 DHCP: Assigned IP 192.168.1.50'), 3000);
        setTimeout(() => logMessage('✅ Connected! Internet access granted'), 3500);
    };

    const demonstrateChannels = () => {
        setLogs([]);
        logMessage('📻 WiFi Channel Demo');
        setTimeout(() => logMessage('2.4 GHz: 14 channels (1, 6, 11 non-overlapping)'), 500);
        setTimeout(() => logMessage('5 GHz: 25+ channels (less interference)'), 1500);
        setTimeout(() => logMessage('Channel 6 selected (least congested)'), 2500);
    };

    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Wireless Networking (WiFi)</h3>
                <p className="text-sm text-white/70">
                    802.11 standards - Cables ke bina internet! Radio waves use karke data transfer.
                    Ghar, office, cafe - har jagah WiFi! 📡
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    How WiFi Works
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">Radio Waves</strong>
                    <p className="text-xs text-white/60">
                        WiFi 2.4 GHz aur 5 GHz radio frequencies use karta hai. Data ko electromagnetic waves mein convert karke bhejta hai.
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">Access Point (AP)</strong>
                    <p className="text-xs text-white/60">
                        Router ya AP wireless signal broadcast karta hai. Devices connect karke internet access karte hain.
                    </p>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                    <strong className="text-purple-300 text-sm block mb-1">SSID</strong>
                    <p className="text-xs text-white/60">
                        Service Set Identifier - WiFi network ka naam. Yeh broadcast hota hai taaki devices dekh sakein.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Security:</h4>
                <div className="space-y-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-red-400">Open/WEP</strong>
                        <p className="text-white/50 text-[10px]">❌ Insecure - Avoid!</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-yellow-400">WPA/WPA2</strong>
                        <p className="text-white/50 text-[10px]">✅ Good - Widely used</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">WPA3</strong>
                        <p className="text-white/50 text-[10px]">✅ Best - Latest standard</p>
                    </div>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>💡 Pro Tip:</strong> Use 5 GHz for speed, 2.4 GHz for range.
                Always enable WPA2/WPA3 security!
            </div>
        </div>
    );

    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* WiFi Standards */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">WiFi Standards (802.11)</h3>
                    <div className="space-y-2">
                        {standards.map((std) => (
                            <div
                                key={std.id}
                                onClick={() => setSelectedStandard(std.id)}
                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedStandard === std.id
                                        ? 'border-blue-500 bg-blue-500/20'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Radio size={20} className="text-blue-400" />
                                        <div>
                                            <div className="font-bold text-white text-sm">{std.id}</div>
                                            <div className="text-xs text-white/50">Released: {std.year}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-cyan-400">{std.speed}</div>
                                        <div className="text-xs text-white/50">{std.freq}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Modes */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-green-400" />
                        Security Modes
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                        {securityModes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setSecurityMode(mode.id)}
                                className={`p-3 rounded-xl border-2 transition-all ${securityMode === mode.id
                                        ? `border-${mode.color}-500 bg-${mode.color}-500/20`
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="text-center">
                                    {mode.secure ? (
                                        <Lock size={20} className={`text-${mode.color}-400 mx-auto mb-1`} />
                                    ) : (
                                        <Unlock size={20} className={`text-${mode.color}-400 mx-auto mb-1`} />
                                    )}
                                    <div className="text-xs font-bold text-white">{mode.id}</div>
                                    <div className="text-[10px] text-white/50">{mode.level}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Signal Strength */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Signal size={20} className="text-cyan-400" />
                        Signal Strength
                    </h3>
                    <div className="space-y-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={signalStrength}
                            onChange={(e) => setSignalStrength(parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-white/50">Weak</div>
                            <div className="text-2xl font-bold text-white">{signalStrength}%</div>
                            <div className="text-sm text-white/50">Strong</div>
                        </div>
                        <div className="h-4 bg-black/40 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all ${signalStrength > 70 ? 'bg-green-500' :
                                        signalStrength > 40 ? 'bg-yellow-500' :
                                            'bg-red-500'
                                    }`}
                                style={{ width: `${signalStrength}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={demonstrateHandshake}
                        className="py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Wifi size={18} /> Connection Demo
                    </button>
                    <button
                        onClick={demonstrateChannels}
                        className="py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Radio size={18} /> Channel Info
                    </button>
                </div>
            </div>
        </div>
    );

    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Frequency Bands</h4>
                <div className="space-y-2 text-xs">
                    <div className="bg-blue-500/10 p-2 rounded">
                        <strong className="text-blue-400">2.4 GHz</strong>
                        <p className="text-white/50 text-[10px]">Better range, more interference</p>
                    </div>
                    <div className="bg-green-500/10 p-2 rounded">
                        <strong className="text-green-400">5 GHz</strong>
                        <p className="text-white/50 text-[10px]">Faster speed, less range</p>
                    </div>
                    <div className="bg-purple-500/10 p-2 rounded">
                        <strong className="text-purple-400">6 GHz (WiFi 6E)</strong>
                        <p className="text-white/50 text-[10px]">Latest, ultra-fast</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50">
                    WiFi Activity Log
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click buttons to see demos...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="text-white/70 border-l-2 border-blue-500/30 pl-2">
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Fun Fact:</strong> WiFi 6 can handle 100+ devices simultaneously!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="Wireless Networking"
            subtitle="Ch 18: WiFi, 802.11 Standards & Security"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default WirelessScene;
