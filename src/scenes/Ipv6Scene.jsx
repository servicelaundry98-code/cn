import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Zap, Shield, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const Ipv6Scene = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'address' | 'transition'
    const [ipv6Input, setIpv6Input] = useState('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    const [compressedIPv6, setCompressedIPv6] = useState('');

    const compressIPv6 = (address) => {
        // Remove leading zeros
        let compressed = address.replace(/(^|:)0+([0-9a-f])/g, '$1$2');

        // Replace longest sequence of :0:0: with ::
        const parts = compressed.split(':');
        let maxZeroStart = -1;
        let maxZeroLen = 0;
        let currentZeroStart = -1;
        let currentZeroLen = 0;

        parts.forEach((part, i) => {
            if (part === '0' || part === '') {
                if (currentZeroStart === -1) currentZeroStart = i;
                currentZeroLen++;
            } else {
                if (currentZeroLen > maxZeroLen) {
                    maxZeroLen = currentZeroLen;
                    maxZeroStart = currentZeroStart;
                }
                currentZeroStart = -1;
                currentZeroLen = 0;
            }
        });

        if (currentZeroLen > maxZeroLen) {
            maxZeroLen = currentZeroLen;
            maxZeroStart = currentZeroStart;
        }

        if (maxZeroLen > 1) {
            const before = parts.slice(0, maxZeroStart).join(':');
            const after = parts.slice(maxZeroStart + maxZeroLen).join(':');
            compressed = before + '::' + after;
        }

        setCompressedIPv6(compressed || address);
    };

    React.useEffect(() => {
        compressIPv6(ipv6Input);
    }, [ipv6Input]);

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-blue-400 mb-2">IPv6 - The Future of Internet</h3>
                <p className="text-sm text-white/70">
                    IPv4 addresses khatam ho rahe hain (4.3 billion). IPv6 mein 340 undecillion addresses hain -
                    har atom ke liye IP address! 🌍
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    IPv4 vs IPv6
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-500/10 border-l-2 border-orange-500 p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={14} className="text-orange-400" />
                            <strong className="text-orange-300 text-sm">IPv4 (Old)</strong>
                        </div>
                        <ul className="text-xs text-white/60 space-y-1 ml-4 list-disc">
                            <li>32-bit address</li>
                            <li>4.3 billion addresses</li>
                            <li>Dotted decimal (192.168.1.1)</li>
                            <li>NAT required</li>
                            <li>No built-in security</li>
                        </ul>
                    </div>

                    <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle size={14} className="text-green-400" />
                            <strong className="text-green-300 text-sm">IPv6 (New)</strong>
                        </div>
                        <ul className="text-xs text-white/60 space-y-1 ml-4 list-disc">
                            <li>128-bit address</li>
                            <li>340 undecillion addresses</li>
                            <li>Hexadecimal (2001:db8::1)</li>
                            <li>No NAT needed</li>
                            <li>IPSec built-in</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Why IPv6?</strong> Har smartphone, IoT device, car ko unique IP chahiye.
                IPv4 se yeh possible nahi hai!
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">IPv6 Address Types:</h4>
                <div className="space-y-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-cyan-400">Unicast</strong>
                        <p className="text-white/50 text-[10px]">One-to-one communication</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-purple-400">Multicast</strong>
                        <p className="text-white/50 text-[10px]">One-to-many (no broadcast)</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">Anycast</strong>
                        <p className="text-white/50 text-[10px]">One-to-nearest</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Special Addresses:</h4>
                <div className="space-y-1 text-xs font-mono">
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Loopback:</span>
                        <span className="text-cyan-400">::1</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Unspecified:</span>
                        <span className="text-cyan-400">::</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Link-local:</span>
                        <span className="text-cyan-400">fe80::/10</span>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* Tab Navigation */}
                <div className="flex gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('comparison')}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'comparison'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                    >
                        Comparison
                    </button>
                    <button
                        onClick={() => setActiveTab('address')}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'address'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                    >
                        Address Format
                    </button>
                    <button
                        onClick={() => setActiveTab('transition')}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'transition'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                    >
                        Transition
                    </button>
                </div>

                {/* Comparison Tab */}
                {activeTab === 'comparison' && (
                    <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">IPv4 vs IPv6 Comparison</h3>

                        <div className="space-y-4">
                            {/* Address Space */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30">
                                    <div className="text-xs text-orange-300 mb-2">IPv4 Address Space</div>
                                    <div className="text-2xl font-bold text-white mb-1">4.3 Billion</div>
                                    <div className="text-xs text-white/50">2^32 addresses</div>
                                    <div className="mt-3 h-2 bg-red-500 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
                                    </div>
                                    <div className="text-xs text-red-400 mt-1">⚠️ Almost exhausted!</div>
                                </div>

                                <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                                    <div className="text-xs text-green-300 mb-2">IPv6 Address Space</div>
                                    <div className="text-2xl font-bold text-white mb-1">340 Undecillion</div>
                                    <div className="text-xs text-white/50">2^128 addresses</div>
                                    <div className="mt-3 h-2 bg-green-500/20 rounded-full" />
                                    <div className="text-xs text-green-400 mt-1">✅ Virtually unlimited!</div>
                                </div>
                            </div>

                            {/* Format Comparison */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl">
                                    <div className="text-xs text-orange-300 mb-2">IPv4 Format</div>
                                    <div className="font-mono text-sm text-white bg-black/40 p-3 rounded">
                                        192.168.1.1
                                    </div>
                                    <div className="text-xs text-white/50 mt-2">4 octets (8 bits each)</div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-xl">
                                    <div className="text-xs text-green-300 mb-2">IPv6 Format</div>
                                    <div className="font-mono text-xs text-white bg-black/40 p-3 rounded break-all">
                                        2001:0db8:85a3::8a2e:0370:7334
                                    </div>
                                    <div className="text-xs text-white/50 mt-2">8 groups (16 bits each)</div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-xs font-bold text-orange-300">IPv4 Limitations</div>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-red-400">✗</span> Address exhaustion
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-red-400">✗</span> NAT required
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-red-400">✗</span> No built-in security
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-red-400">✗</span> Complex configuration
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-xs font-bold text-green-300">IPv6 Advantages</div>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-green-400">✓</span> Unlimited addresses
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-green-400">✓</span> No NAT needed
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-green-400">✓</span> IPSec mandatory
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <span className="text-green-400">✓</span> Auto-configuration
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Address Format Tab */}
                {activeTab === 'address' && (
                    <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">IPv6 Address Format</h3>

                        {/* Address Input */}
                        <div className="mb-6">
                            <label className="text-xs text-white/50 block mb-2">Enter IPv6 Address:</label>
                            <input
                                type="text"
                                value={ipv6Input}
                                onChange={(e) => setIpv6Input(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                                placeholder="2001:0db8:85a3:0000:0000:8a2e:0370:7334"
                            />
                        </div>

                        {/* Address Breakdown */}
                        <div className="space-y-4">
                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                                <div className="text-xs text-blue-300 mb-2">Full Address (128 bits)</div>
                                <div className="font-mono text-sm text-white break-all">{ipv6Input}</div>
                            </div>

                            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                                <div className="text-xs text-green-300 mb-2">Compressed Address</div>
                                <div className="font-mono text-sm text-white">{compressedIPv6}</div>
                                <div className="text-xs text-white/50 mt-2">
                                    ✓ Leading zeros removed<br />
                                    ✓ Longest zero sequence replaced with ::
                                </div>
                            </div>

                            {/* Address Structure */}
                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                                <div className="text-xs text-purple-300 mb-3">Address Structure</div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <div className="text-white/50 mb-1">Network Prefix (64 bits)</div>
                                        <div className="font-mono text-cyan-400 bg-black/40 p-2 rounded">
                                            2001:0db8:85a3:0000
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-white/50 mb-1">Interface ID (64 bits)</div>
                                        <div className="font-mono text-green-400 bg-black/40 p-2 rounded">
                                            0000:8a2e:0370:7334
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Compression Rules */}
                            <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30">
                                <div className="text-xs text-orange-300 mb-2">Compression Rules</div>
                                <div className="space-y-2 text-xs text-white/70">
                                    <div className="flex items-start gap-2">
                                        <span className="text-orange-400">1.</span>
                                        <span>Leading zeros can be omitted: 0001 → 1</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-orange-400">2.</span>
                                        <span>Consecutive zeros can be replaced with :: (once only)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-orange-400">3.</span>
                                        <span>Example: 2001:0db8:0000:0000:0000:0000:0000:0001 → 2001:db8::1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transition Tab */}
                {activeTab === 'transition' && (
                    <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-bold text-white mb-4">IPv4 to IPv6 Transition</h3>

                        <div className="space-y-4">
                            {/* Dual Stack */}
                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Network size={18} className="text-blue-400" />
                                    <strong className="text-blue-300">1. Dual Stack</strong>
                                </div>
                                <p className="text-xs text-white/70 mb-3">
                                    Device par IPv4 aur IPv6 dono chalte hain simultaneously
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-orange-500/20 p-2 rounded text-center">
                                        <div className="text-xs text-orange-300">IPv4</div>
                                        <div className="font-mono text-xs text-white">192.168.1.1</div>
                                    </div>
                                    <span className="text-white/50">+</span>
                                    <div className="flex-1 bg-green-500/20 p-2 rounded text-center">
                                        <div className="text-xs text-green-300">IPv6</div>
                                        <div className="font-mono text-xs text-white">2001:db8::1</div>
                                    </div>
                                </div>
                            </div>

                            {/* Tunneling */}
                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap size={18} className="text-purple-400" />
                                    <strong className="text-purple-300">2. Tunneling</strong>
                                </div>
                                <p className="text-xs text-white/70 mb-3">
                                    IPv6 packets ko IPv4 network ke through bhejte hain (encapsulation)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500/20 px-3 py-2 rounded text-xs text-green-300">IPv6</div>
                                    <ArrowRight size={16} className="text-white/50" />
                                    <div className="bg-orange-500/20 px-3 py-2 rounded text-xs text-orange-300">IPv4 Tunnel</div>
                                    <ArrowRight size={16} className="text-white/50" />
                                    <div className="bg-green-500/20 px-3 py-2 rounded text-xs text-green-300">IPv6</div>
                                </div>
                            </div>

                            {/* Translation */}
                            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Globe size={18} className="text-green-400" />
                                    <strong className="text-green-300">3. Translation (NAT64)</strong>
                                </div>
                                <p className="text-xs text-white/70 mb-3">
                                    IPv6-only network se IPv4-only server tak communication
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500/20 px-3 py-2 rounded text-xs text-green-300">IPv6 Client</div>
                                    <ArrowRight size={16} className="text-white/50" />
                                    <div className="bg-cyan-500/20 px-3 py-2 rounded text-xs text-cyan-300">NAT64</div>
                                    <ArrowRight size={16} className="text-white/50" />
                                    <div className="bg-orange-500/20 px-3 py-2 rounded text-xs text-orange-300">IPv4 Server</div>
                                </div>
                            </div>

                            {/* Adoption Status */}
                            <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">
                                <div className="text-xs text-cyan-300 mb-3">Global IPv6 Adoption</div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-white/70">Worldwide</span>
                                            <span className="text-white">~40%</span>
                                        </div>
                                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '40%' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-white/70">India</span>
                                            <span className="text-white">~65%</span>
                                        </div>
                                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: '65%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Quick Facts</h4>
                <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-400 mt-0.5" />
                        <div>
                            <div className="text-white font-bold">340 Undecillion Addresses</div>
                            <div className="text-white/50">340,282,366,920,938,463,463,374,607,431,768,211,456</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Shield size={14} className="text-blue-400 mt-0.5" />
                        <div>
                            <div className="text-white font-bold">Built-in Security</div>
                            <div className="text-white/50">IPSec is mandatory in IPv6</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Zap size={14} className="text-yellow-400 mt-0.5" />
                        <div>
                            <div className="text-white font-bold">Auto-configuration</div>
                            <div className="text-white/50">SLAAC - No DHCP needed</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 p-4">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Common IPv6 Prefixes</h4>
                <div className="space-y-2 text-xs font-mono">
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-cyan-400">2000::/3</div>
                        <div className="text-white/50 text-[10px]">Global Unicast (Internet)</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-purple-400">fe80::/10</div>
                        <div className="text-white/50 text-[10px]">Link-Local (Same network)</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-green-400">fc00::/7</div>
                        <div className="text-white/50 text-[10px]">Unique Local (Private)</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-orange-400">ff00::/8</div>
                        <div className="text-white/50 text-[10px]">Multicast</div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Fun Fact:</strong> IPv6 has enough addresses to assign 100 IPs to every atom on Earth!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="IPv6 - Next Generation IP"
            subtitle="Module 4.5: The Future of Internet Addressing"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default Ipv6Scene;
