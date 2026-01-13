import { useState, useCallback } from 'react';

export const useNetworkSimulation = (positions) => {
    const [packets, setPackets] = useState([]);
    const [message, setMessage] = useState(null);
    const [simulationMode, setSimulationMode] = useState('simple');

    // Handshake State
    const [tcpState, setTcpState] = useState('CLOSED');

    // Router Failure State
    const [routerStatus, setRouterStatus] = useState({ router1: 'active' });

    const toggleRouter = useCallback((routerId) => {
        setRouterStatus(prev => {
            const newStatus = prev[routerId] === 'active' ? 'failed' : 'active';
            setMessage({
                text: newStatus === 'failed' ? `⚠️ CRITICAL: ${routerId} FAILURE DETECTED! Rerouting...` : `✅ ${routerId} Online. Path Restored.`,
                type: newStatus === 'failed' ? 'error' : 'success'
            });
            return { ...prev, [routerId]: newStatus };
        });
    }, []);

    const sendPacket = useCallback(() => {
        const id = Date.now();
        let newPackets = [];

        // DYNAMIC ROUTE CALCULATION
        // If Router 1 is down, use Router 2
        const currentPath = routerStatus.router1 === 'active'
            ? ['client', 'router1', 'server']
            : ['client', 'router2', 'server'];

        // Calculate first hop target safely
        // Path is [client, routerX, server]
        // Step 0 target is path[1]
        const firstHopTarget = positions[currentPath[1]];

        if (simulationMode === 'tcp') {
            if (tcpState === 'CLOSED' || tcpState === 'ESTABLISHED') {
                setMessage({ text: "Initiating 3-Way Handshake: Sending SYN", type: 'info' });
                setTcpState('SYN_SENT');
                newPackets.push({
                    id: `${id}-syn`,
                    step: 0,
                    path: currentPath,
                    currentPos: positions.client,
                    targetPos: firstHopTarget,
                    type: 'SYN',
                    label: 'SYN'
                });
            }
        } else if (simulationMode === 'fragmentation') {
            setMessage({ text: "File too large! Fragmenting into 3 packets...", type: 'warning' });
            [0, 1, 2].forEach((i) => {
                newPackets.push({
                    id: `${id}-frag-${i}`,
                    step: 0,
                    path: currentPath,
                    currentPos: positions.client,
                    targetPos: firstHopTarget,
                    type: 'DATA',
                    label: `Frag ${i + 1}/3`,
                    delay: i * 500
                });
            });
        } else {
            setMessage({ text: "Sending Standard Data Packet", type: 'success' });
            newPackets.push({
                id: id,
                step: 0,
                path: currentPath,
                currentPos: positions.client,
                targetPos: firstHopTarget,
                type: 'DATA',
                label: 'Data'
            });
        }

        setPackets(prev => [...prev, ...newPackets]);
    }, [positions, simulationMode, tcpState, routerStatus]);

    const handlePacketArrival = useCallback((packetId) => {
        setPackets(prev => {
            const packet = prev.find(p => p.id === packetId);
            if (!packet) return prev;

            const nextStep = packet.step + 1;

            // CHECK FINAL ARRIVAL
            if (nextStep >= packet.path.length) {
                if (simulationMode === 'tcp') {
                    if (packet.type === 'SYN') {
                        setTimeout(() => {
                            setMessage({ text: "Server received SYN. Sending SYN-ACK...", type: 'info' });
                            // Reverse path for return trip
                            const returnPath = [...packet.path].reverse();
                            setPackets(curr => [...curr, {
                                id: `${Date.now()}-syn-ack`,
                                step: 0,
                                path: returnPath,
                                currentPos: positions.server,
                                targetPos: positions[returnPath[1]],
                                type: 'SYN-ACK',
                                label: 'SYN-ACK'
                            }]);
                            setTcpState('SYN_RCVD');
                        }, 500);
                    } else if (packet.type === 'SYN-ACK') {
                        setTimeout(() => {
                            setMessage({ text: "Client received SYN-ACK. Connection Established! Sending ACK.", type: 'success' });
                            // Use original forward path again
                            const ackPath = routerStatus.router1 === 'active'
                                ? ['client', 'router1', 'server']
                                : ['client', 'router2', 'server'];

                            setPackets(curr => [...curr, {
                                id: `${Date.now()}-ack`,
                                step: 0,
                                path: ackPath,
                                currentPos: positions.client,
                                targetPos: positions[ackPath[1]],
                                type: 'ACK',
                                label: 'ACK'
                            }]);
                            setTcpState('ESTABLISHED');
                        }, 500);
                    } else if (packet.type === 'ACK') {
                        setMessage({ text: "Handshake Complete. Secure Tunnel Ready.", type: 'success' });
                    }
                } else if (simulationMode === 'fragmentation') {
                    setMessage({ text: `Fragment ${packet.label} Reassembled at Server`, type: 'success' });
                } else {
                    setMessage({ text: "Data Received by Google Server", type: 'success' });
                }
                return prev.filter(p => p.id !== packetId);
            }

            // MOVE TO NEXT HOP
            return prev.map(p => {
                if (p.id !== packetId) return p;
                return {
                    ...p,
                    step: nextStep,
                    currentPos: positions[packet.path[nextStep]],
                    targetPos: positions[packet.path[nextStep + 1]]
                };
            });
        });
    }, [positions, simulationMode, tcpState, routerStatus]);

    return {
        packets,
        setPackets,
        message,
        setMessage,
        simulationMode,
        setSimulationMode,
        sendPacket,
        handlePacketArrival,
        tcpState,
        routerStatus,
        toggleRouter
    };
};
