import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Network, Hash, Users } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const SubnettingScene = ({ onBack }) => {
    const [ipAddress, setIpAddress] = useState('192.168.1.0');
    const [cidr, setCidr] = useState(24);
    const [subnetInfo, setSubnetInfo] = useState(null);

    const calculateSubnet = useCallback(() => {
        try {
            const octets = ipAddress.split('.').map(Number);
            if (octets.length !== 4 || octets.some(o => o < 0 || o > 255)) {
                setSubnetInfo(null);
                return;
            }

            // Calculate subnet mask
            const maskBits = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
            const maskOctets = [];
            for (let i = 0; i < 4; i++) {
                maskOctets.push(parseInt(maskBits.substr(i * 8, 8), 2));
            }
            const subnetMask = maskOctets.join('.');

            // Calculate network address
            const networkOctets = octets.map((octet, i) => octet & maskOctets[i]);
            const networkAddress = networkOctets.join('.');

            // Calculate broadcast address
            const wildcardOctets = maskOctets.map(m => 255 - m);
            const broadcastOctets = networkOctets.map((octet, i) => octet | wildcardOctets[i]);
            const broadcastAddress = broadcastOctets.join('.');

            // Calculate first and last usable IP
            const firstUsableOctets = [...networkOctets];
            firstUsableOctets[3] += 1;
            const firstUsable = firstUsableOctets.join('.');

            const lastUsableOctets = [...broadcastOctets];
            lastUsableOctets[3] -= 1;
            const lastUsable = lastUsableOctets.join('.');

            // Calculate total hosts
            const hostBits = 32 - cidr;
            const totalHosts = Math.pow(2, hostBits);
            const usableHosts = totalHosts - 2; // Minus network and broadcast

            // Determine class
            const firstOctet = octets[0];
            let ipClass = '';
            if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A';
            else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
            else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
            else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
            else ipClass = 'E (Reserved)';

            // Determine if private
            const isPrivate =
                (firstOctet === 10) ||
                (firstOctet === 172 && octets[1] >= 16 && octets[1] <= 31) ||
                (firstOctet === 192 && octets[1] === 168);

            setSubnetInfo({
                networkAddress,
                subnetMask,
                broadcastAddress,
                firstUsable,
                lastUsable,
                totalHosts,
                usableHosts,
                ipClass,
                isPrivate,
                cidr,
                wildcardMask: wildcardOctets.join('.')
            });
        } catch {
            setSubnetInfo(null);
        }
    }, [ipAddress, cidr]);

    // Calculate subnet information
    useEffect(() => {
        calculateSubnet();
    }, [calculateSubnet]);

    const handleCidrChange = (value) => {
        const num = parseInt(value);
        if (num >= 1 && num <= 32) {
            setCidr(num);
        }
    };

    const commonSubnets = [
        { cidr: 8, mask: '255.0.0.0', hosts: '16,777,214' },
        { cidr: 16, mask: '255.255.0.0', hosts: '65,534' },
        { cidr: 24, mask: '255.255.255.0', hosts: '254' },
        { cidr: 25, mask: '255.255.255.128', hosts: '126' },
        { cidr: 26, mask: '255.255.255.192', hosts: '62' },
        { cidr: 27, mask: '255.255.255.224', hosts: '30' },
        { cidr: 28, mask: '255.255.255.240', hosts: '14' },
        { cidr: 29, mask: '255.255.255.248', hosts: '6' },
        { cidr: 30, mask: '255.255.255.252', hosts: '2' },
    ];

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">IP Subnetting</h3>
                <p className="text-sm text-white/70">
                    Ek bade network ko chhote-chhote subnets mein divide karna.
                    Yeh IP addresses ko efficiently use karne mein madad karta hai.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Key Concepts
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">Network Address</strong>
                    <p className="text-xs text-white/60">
                        Subnet ka pehla address. Yeh network ko identify karta hai.
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">Broadcast Address</strong>
                    <p className="text-xs text-white/60">
                        Subnet ka last address. Sabko message bhejne ke liye.
                    </p>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                    <strong className="text-purple-300 text-sm block mb-1">Usable IPs</strong>
                    <p className="text-xs text-white/60">
                        Network aur Broadcast ke beech ke addresses. Devices ko assign karne ke liye.
                    </p>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>💡 CIDR Notation:</strong> /24 means pehle 24 bits network ke liye,
                baaki 8 bits hosts ke liye. Jitna bada CIDR, utne kam hosts.
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">IP Classes:</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-red-400">Class A</strong>
                        <p className="text-white/50 text-[10px]">1.0.0.0 - 126.255.255.255</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-yellow-400">Class B</strong>
                        <p className="text-white/50 text-[10px]">128.0.0.0 - 191.255.255.255</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">Class C</strong>
                        <p className="text-white/50 text-[10px]">192.0.0.0 - 223.255.255.255</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Private IP Ranges:</h4>
                <div className="space-y-1 text-xs font-mono">
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Class A:</span>
                        <span className="text-cyan-400">10.0.0.0/8</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Class B:</span>
                        <span className="text-cyan-400">172.16.0.0/12</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex justify-between">
                        <span className="text-white/70">Class C:</span>
                        <span className="text-cyan-400">192.168.0.0/16</span>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-3xl space-y-6">
                {/* Input Section */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Calculator size={20} className="text-cyan-400" />
                        Subnet Calculator
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-white/50 block mb-2">IP Address</label>
                            <input
                                type="text"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="192.168.1.0"
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 block mb-2">CIDR (1-32)</label>
                            <input
                                type="number"
                                min="1"
                                max="32"
                                value={cidr}
                                onChange={(e) => handleCidrChange(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                    </div>

                    {/* CIDR Slider */}
                    <div className="mt-4">
                        <input
                            type="range"
                            min="1"
                            max="32"
                            value={cidr}
                            onChange={(e) => setCidr(parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/30 mt-1">
                            <span>/1 (Huge)</span>
                            <span>/16 (Medium)</span>
                            <span>/32 (Single)</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {subnetInfo && (
                    <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Network size={20} className="text-green-400" />
                            Subnet Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                                <div className="text-xs text-blue-300 mb-1">Network Address</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.networkAddress}/{subnetInfo.cidr}</div>
                            </div>

                            <div className="bg-purple-500/10 p-3 rounded border border-purple-500/30">
                                <div className="text-xs text-purple-300 mb-1">Subnet Mask</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.subnetMask}</div>
                            </div>

                            <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                <div className="text-xs text-green-300 mb-1">First Usable IP</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.firstUsable}</div>
                            </div>

                            <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                <div className="text-xs text-green-300 mb-1">Last Usable IP</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.lastUsable}</div>
                            </div>

                            <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                                <div className="text-xs text-red-300 mb-1">Broadcast Address</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.broadcastAddress}</div>
                            </div>

                            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                                <div className="text-xs text-yellow-300 mb-1">Wildcard Mask</div>
                                <div className="text-sm font-mono text-white">{subnetInfo.wildcardMask}</div>
                            </div>

                            <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/30">
                                <div className="text-xs text-cyan-300 mb-1 flex items-center gap-1">
                                    <Users size={12} /> Usable Hosts
                                </div>
                                <div className="text-lg font-bold text-white">{subnetInfo.usableHosts.toLocaleString()}</div>
                            </div>

                            <div className="bg-orange-500/10 p-3 rounded border border-orange-500/30">
                                <div className="text-xs text-orange-300 mb-1">IP Class</div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    {subnetInfo.ipClass}
                                    {subnetInfo.isPrivate && (
                                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">Private</span>
                                    )}
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
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3 flex items-center gap-2">
                    <Hash size={14} /> Quick Presets
                </h4>
                <div className="space-y-2">
                    {commonSubnets.map((subnet) => (
                        <button
                            key={subnet.cidr}
                            onClick={() => setCidr(subnet.cidr)}
                            className={`w-full text-left px-3 py-2 rounded transition-all text-xs ${cidr === subnet.cidr
                                ? 'bg-cyan-500/20 border border-cyan-500'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-white">/{subnet.cidr}</span>
                                <span className="text-white/50">{subnet.hosts} hosts</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {subnetInfo && (
                <div className="bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 p-4">
                    <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Binary Breakdown</h4>
                    <div className="space-y-2 font-mono text-xs">
                        <div>
                            <div className="text-white/50 mb-1">Network Bits:</div>
                            <div className="text-green-400">{'1'.repeat(cidr)}</div>
                        </div>
                        <div>
                            <div className="text-white/50 mb-1">Host Bits:</div>
                            <div className="text-blue-400">{'0'.repeat(32 - cidr)}</div>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                            <div className="text-white/50 mb-1">Total Bits:</div>
                            <div className="text-white">32 bits (IPv4)</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 p-4">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Use Cases</h4>
                <div className="space-y-3 text-xs">
                    <div className="bg-white/5 p-3 rounded">
                        <div className="font-bold text-cyan-400 mb-1">/24 - Small Office</div>
                        <div className="text-white/60">254 hosts - Perfect for small business</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <div className="font-bold text-green-400 mb-1">/16 - Campus</div>
                        <div className="text-white/60">65,534 hosts - University network</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <div className="font-bold text-purple-400 mb-1">/30 - Point-to-Point</div>
                        <div className="text-white/60">2 hosts - Router to router link</div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Pro Tip:</strong> Always reserve first and last IPs for network and broadcast!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="IP Subnetting"
            subtitle="Module 4.4: Network Division & IP Planning"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default SubnettingScene;
