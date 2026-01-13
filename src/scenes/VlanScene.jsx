import React, { useState } from 'react';
import { Layers, Users, Shield, Zap, Network, CheckCircle } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const VlanScene = ({ onBack }) => {
    const [selectedVlan, setSelectedVlan] = useState(null);
    const [logs, setLogs] = useState([]);
    const [showTrunk, setShowTrunk] = useState(false);

    const vlans = [
        { id: 10, name: 'Sales', color: 'blue', devices: ['PC1', 'PC2', 'Printer1'], subnet: '192.168.10.0/24' },
        { id: 20, name: 'Engineering', color: 'green', devices: ['PC3', 'PC4', 'Server1'], subnet: '192.168.20.0/24' },
        { id: 30, name: 'HR', color: 'purple', devices: ['PC5', 'PC6'], subnet: '192.168.30.0/24' },
        { id: 99, name: 'Management', color: 'orange', devices: ['Admin'], subnet: '192.168.99.0/24' }
    ];

    const logMessage = (msg) => {
        setLogs(prev => [`• ${msg}`, ...prev].slice(0, 12));
    };

    const demonstrateIsolation = () => {
        setLogs([]);
        logMessage('🔒 VLAN Isolation Demo');
        setTimeout(() => logMessage('PC1 (VLAN 10) tries to ping PC3 (VLAN 20)'), 500);
        setTimeout(() => logMessage('❌ BLOCKED! Different VLANs cannot communicate'), 1500);
        setTimeout(() => logMessage('PC1 tries to ping PC2 (same VLAN 10)'), 3000);
        setTimeout(() => logMessage('✅ SUCCESS! Same VLAN communication allowed'), 4000);
    };

    const demonstrateTrunk = () => {
        setShowTrunk(true);
        setLogs([]);
        logMessage('🌉 Trunk Port Demo');
        setTimeout(() => logMessage('Trunk port carries ALL VLANs (10, 20, 30, 99)'), 500);
        setTimeout(() => logMessage('Uses 802.1Q tagging to identify VLANs'), 1500);
        setTimeout(() => logMessage('Connects switches together'), 2500);
    };

    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-purple-400 mb-2">VLANs - Virtual LANs</h3>
                <p className="text-sm text-white/70">
                    Ek physical switch ko multiple logical networks mein divide karta hai.
                    Security aur performance improve karta hai! 🔒
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Why VLANs?
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">Security</strong>
                    <p className="text-xs text-white/60">
                        Different departments ko alag kar sakte ho. Sales wale HR ka data nahi dekh sakte.
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">Performance</strong>
                    <p className="text-xs text-white/60">
                        Broadcast traffic reduce hota hai. Har VLAN apna broadcast domain hai.
                    </p>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                    <strong className="text-purple-300 text-sm block mb-1">Flexibility</strong>
                    <p className="text-xs text-white/60">
                        Bina cable change kiye departments reorganize kar sakte ho.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Port Types:</h4>
                <div className="space-y-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-cyan-400">Access Port</strong>
                        <p className="text-white/50 text-[10px]">One VLAN only (for end devices)</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-orange-400">Trunk Port</strong>
                        <p className="text-white/50 text-[10px]">Multiple VLANs (switch-to-switch)</p>
                    </div>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>💡 Real Example:</strong> Office mein Sales (VLAN 10), Engineering (VLAN 20),
                HR (VLAN 30) - sabko alag network, same switch!
            </div>
        </div>
    );

    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* Switch with VLANs */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">Virtual LANs on Single Switch</h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {vlans.map((vlan) => (
                            <div
                                key={vlan.id}
                                onClick={() => setSelectedVlan(vlan)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedVlan?.id === vlan.id
                                        ? `border-${vlan.color}-500 bg-${vlan.color}-500/20 shadow-[0_0_20px_var(--tw-shadow-color)]`
                                        : `border-${vlan.color}-500/30 bg-${vlan.color}-500/10 hover:bg-${vlan.color}-500/20`
                                    }`}
                                style={{
                                    borderColor: `var(--${vlan.color}-500)`,
                                    backgroundColor: selectedVlan?.id === vlan.id
                                        ? `rgba(var(--${vlan.color}-500-rgb), 0.2)`
                                        : `rgba(var(--${vlan.color}-500-rgb), 0.1)`
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Layers size={16} className={`text-${vlan.color}-400`} />
                                        <strong className="text-sm text-white">VLAN {vlan.id}</strong>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded bg-${vlan.color}-500/30 text-${vlan.color}-300`}>
                                        {vlan.name}
                                    </span>
                                </div>
                                <div className="text-xs text-white/50 mb-2">{vlan.subnet}</div>
                                <div className="flex flex-wrap gap-1">
                                    {vlan.devices.map((device, i) => (
                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">
                                            {device}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Switch */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-white/10 text-center">
                        <Network size={32} className="text-purple-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white">Layer 2 Switch</div>
                        <div className="text-xs text-white/50">Cisco Catalyst 2960</div>
                        {showTrunk && (
                            <div className="mt-2 text-xs text-orange-400">
                                🌉 Trunk Port Active (802.1Q)
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={demonstrateIsolation}
                        className="py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Shield size={18} /> Test Isolation
                    </button>
                    <button
                        onClick={demonstrateTrunk}
                        className="py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Zap size={18} /> Show Trunk
                    </button>
                </div>

                {/* Selected VLAN Info */}
                {selectedVlan && (
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                        <h4 className="text-sm font-bold text-purple-300 mb-2">
                            VLAN {selectedVlan.id} - {selectedVlan.name}
                        </h4>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-white/50">Subnet:</span>
                                <span className="text-white font-mono">{selectedVlan.subnet}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Devices:</span>
                                <span className="text-white">{selectedVlan.devices.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Isolation:</span>
                                <span className="text-green-400">✅ Enabled</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">VLAN Benefits</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-white/70">Security: Department isolation</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-blue-400" />
                        <span className="text-white/70">Performance: Reduced broadcasts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-purple-400" />
                        <span className="text-white/70">Flexibility: Easy reorganization</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-orange-400" />
                        <span className="text-white/70">Cost: Less hardware needed</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50">
                    VLAN Activity Log
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click buttons to see demos...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="text-white/70 border-l-2 border-purple-500/30 pl-2">
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Pro Tip:</strong> Use VLAN 1 for management, never for user traffic!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="VLANs - Virtual LANs"
            subtitle="Ch 17: Network Segmentation & Security"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default VlanScene;
