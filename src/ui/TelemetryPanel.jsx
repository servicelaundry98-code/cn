import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Hash, MapPin, Server, Cpu } from 'lucide-react';

const TelemetryPanel = ({ currentLayer, phase, isServer }) => {
    // Generate mock header data based on progress
    // If we are at Layer 4 Down (Client), we have L7, L6, L5, L4 headers.
    // If we are at Layer 2 Up (Server), we have L1, L2 headers ... wait.
    // Server Up: Decapsulation. We *have* all headers, but we are *processing*/removing them.
    // Let's visualize "Packet Content" currently 'visible' or 'active' to the layer.

    // Better metaphor: The "Stack" of headers currently attached to the packet.

    // Client Down (Sending):
    // L7: [HTTP]
    // L4: [HTTP][TCP]
    // L3: [HTTP][TCP][IP]

    // Server Up (Receiving):
    // L1: [HTTP][TCP][IP][Eth] -> Strip Eth
    // L2: [HTTP][TCP][IP][Eth] -> Strip Eth? No, L2 sees Eth.

    const getActiveHeaders = () => {
        const headers = [];

        // Base Data (Always there generally)
        if (currentLayer <= 7) {
            headers.push({
                id: 'L7', label: 'APP LAYER', value: 'HTTP GET /index.html', icon: <Server size={14} />, color: '#3b82f6'
            });
        }

        // As we go down, we add. As we go up, we keep finding them until stripped.
        // Simplified Logic: Show what exists on the wire at this step.

        // Logic: specific headers exist if layer <= X (sending) or... 
        // Let's use a simpler mapping based on "Encapsulation Level".
        // But we want to show DETAILS.

        const isDown = phase === 'CLIENT_DOWN' || phase === 'SERVER_DOWN';
        const isUp = phase === 'SERVER_UP' || phase === 'CLIENT_UP';
        const isTravel = phase === 'NETWORK_TRAVEL' || phase === 'NETWORK_RETURN';

        // In Travel, ALL headers are present.
        const effectiveLayer = isTravel ? 1 : currentLayer;

        // Add headers if they have been added (Down) or not yet removed (Up)
        // Down: Current Layer and above have added their parts? 
        // Actually: 
        // At L7 Down: Only L7 data exists.
        // At L4 Down: L7, L6, L5, L4 exist.
        // So: if down, show layers >= currentLayer.

        // Up: We start with everything. At L2, we see L2. At L3, L2 is gone.
        // So: if up, show layers >= currentLayer.
        // Wait, at L3 up, L2 wrapper is discarded. We see L3 and inside.
        // So YES, consistently: Show layers >= currentLayer.

        if (effectiveLayer <= 6) headers.push({ id: 'L6', label: 'TLS', value: 'AES-256-GCM', icon: <Shield size={14} />, color: '#f59e0b' });
        if (effectiveLayer <= 5) headers.push({ id: 'L5', label: 'SESSION', value: 'ID: a7f9-33b1', icon: <Hash size={14} />, color: '#10b981' });
        if (effectiveLayer <= 4) headers.push({ id: 'L4', label: 'TCP SEGMENT', value: 'Src: 49152 | Dest: 443', icon: <Activity size={14} />, color: '#8b5cf6' });
        if (effectiveLayer <= 3) headers.push({ id: 'L3', label: 'IP PACKET', value: isServer ? 'Src: 172.217.0.1' : 'Dest: 172.217.0.1', icon: <MapPin size={14} />, color: '#ef4444' });
        if (effectiveLayer <= 2) headers.push({ id: 'L2', label: 'ETHERNET FRAME', value: 'MAC: 00:1A:2B:3C:4D:5E', icon: <Cpu size={14} />, color: '#f97316' });
        if (effectiveLayer <= 1) headers.push({ id: 'L1', label: 'PHYSICAL', value: '10110101101...', icon: <Activity size={14} />, color: '#06b6d4' });

        return headers.sort((a, b) => {
            // Sort visuals? Outer layers (lower L) should be outside? 
            // List: Top is Inner (App), Bottom is Outer (Phy).
            return 0;
        });
    };

    const headers = getActiveHeaders();

    return (
        <div className="w-80 h-full bg-black/40 backdrop-blur-md border-l border-white/10 p-6 flex flex-col font-mono">
            <h3 className="text-cyan-400 font-bold tracking-widest text-sm mb-6 flex items-center gap-2">
                <Activity size={16} /> LIVE TELEMETRY
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3">
                <AnimatePresence mode='popLayout'>
                    {headers.map((h) => (
                        <motion.div
                            key={h.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-3 relative overflow-hidden group"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: h.color }} />

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold opacity-50" style={{ color: h.color }}>{h.label}</span>
                                {h.icon}
                            </div>
                            <div className="text-xs text-white/90 truncate">
                                {h.value}
                            </div>

                            {/* Scanning effect */}
                            <motion.div
                                initial={{ left: '-100%' }}
                                animate={{ left: '200%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {headers.length === 0 && (
                    <div className="text-white/20 text-center text-xs mt-10">
                        No Data Packets Detected
                    </div>
                )}
            </div>

            {/* Status Footer */}
            <div className="mt-6 pt-6 border-t border-white/10 text-[10px] text-white/40 space-y-2">
                <div className="flex justify-between">
                    <span>PHASE</span>
                    <span className="text-cyan-300">{phase}</span>
                </div>
                <div className="flex justify-between">
                    <span>ENCRYPTION</span>
                    <span className={currentLayer <= 6 ? "text-green-400" : "text-red-400"}>
                        {currentLayer <= 6 ? "ACTIVE" : "NONE"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TelemetryPanel;
