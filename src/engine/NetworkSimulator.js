export const OSI_LAYERS = [
    { id: 7, name: 'Application', color: '#3b82f6', description: 'User Interaction (HTTP/GET)' },
    { id: 6, name: 'Presentation', color: '#f59e0b', description: 'Encryption (SSL/TLS)' },
    { id: 5, name: 'Session', color: '#10b981', description: 'Connection Management' },
    { id: 4, name: 'Transport', color: '#8b5cf6', description: 'Reliability (TCP/Segments)' },
    { id: 3, name: 'Network', color: '#ef4444', description: 'Addressing (IP/Routing)' },
    { id: 2, name: 'Data Link', color: '#f97316', description: 'Framing (MAC/Switching)' },
    { id: 1, name: 'Physical', color: '#06b6d4', description: 'Transmission (Bits/Signals)' }
];

export const ANIMATION_STEPS = {
    CLIENT_DOWN: 'CLIENT_DOWN', // Encapsulation 7->1
    NETWORK_TRAVEL: 'NETWORK_TRAVEL', // 1->1
    SERVER_UP: 'SERVER_UP', // Decapsulation 1->7
    SERVER_PROCESSING: 'SERVER_PROCESSING',
    SERVER_DOWN: 'SERVER_DOWN', // Encapsulation 7->1
    NETWORK_RETURN: 'NETWORK_RETURN',
    CLIENT_UP: 'CLIENT_UP' // Decapsulation 1->7
};

export class SimulationEngine {
    constructor(setLayer, setMessage, setPackets) {
        this.setLayer = setLayer;
        this.setMessage = setMessage;
        this.setPackets = setPackets;
        this.currentStep = 0;
        this.isPlaying = false;
        this.speed = 1000;
        this.timer = null;
    }

    startRequestFlow() {
        this.isPlaying = true;
        this.runStep('CLIENT_DOWN', 7);
    }

    runStep(phase, layerId) {
        // Save state for resume
        this.currentPhase = phase;
        this.currentLayerId = layerId;

        if (!this.isPlaying) return;

        this.setLayer(layerId);

        // Define messages and visuals for each step
        const messages = {
            7: phase === 'SERVER_UP'
                ? "Layer 7 (App): Decrypted! Server reads: 'GET /'."
                : "Layer 7 (App): User generates HTTP GET Request.",
            6: phase === 'SERVER_UP'
                ? "Layer 6 (Presentation): Decrypting SSL/TLS..."
                : "Layer 6 (Presentation): Encrypting data with TLS...",
            5: phase === 'SERVER_UP'
                ? "Layer 5 (Session): Validating Session ID."
                : "Layer 5 (Session): Establishing Session ID tunnel.",
            4: phase === 'SERVER_UP'
                ? "Layer 4 (Transport): Reassembling Segments via TCP."
                : "Layer 4 (Transport): Segmenting data & Attaching TCP Port.",
            3: phase === 'SERVER_UP'
                ? "Layer 3 (Network): Checking Destination IP."
                : "Layer 3 (Network): Attaching Source & Dest IP Addresses.",
            2: phase === 'SERVER_UP'
                ? "Layer 2 (Data Link): Catching Frame & Checking CRC."
                : "Layer 2 (Data Link): Wrapping in Frame with MAC Address.",
            1: phase === 'SERVER_UP'
                ? "Layer 1 (Physical): Receiving electrical signals."
                : "Layer 1 (Physical): Converting bits to electrical signals."
        };

        if (phase === 'NETWORK_TRAVEL') {
            this.setMessage({ text: "Traveling through Fiber Optics & Core Routers...", phase: phase });
        } else {
            this.setMessage({
                text: messages[layerId] || "Processing...",
                phase: phase
            });
        }

        // Trigger visuals (e.g., spawn packet with specific encap)
        this.setPackets([{
            id: 'req',
            layer: layerId,
            phase: phase,
            // Encapsulation Level logic: 
            // CLIENT_DOWN: 7 (App) has 0 rings, 1 (Phys) has 6 rings? 
            // Let's stick to: Level 1 (Phys) is MOST encapsulated (7 rings). Level 7 is LEAST (1 ring).
            // So: 8 - layerId
            encapsulationLevel: phase === 'SERVER_UP' || phase === 'CLIENT_UP'
                ? 8 - layerId // Peeling off: L1=7 rings, L7=1 ring
                : 8 - layerId
        }]);

        // Next Step Logic
        let nextLayer = layerId;
        let nextPhase = phase;
        let delay = this.speed;

        if (phase === 'CLIENT_DOWN') {
            if (layerId > 1) {
                nextLayer = layerId - 1;
            } else {
                nextPhase = 'NETWORK_TRAVEL';
                nextLayer = 0; // Special state for wire
                delay = 2000; // Wait a bit before travel
            }
        } else if (phase === 'NETWORK_TRAVEL') {
            // After travel, we hit Server Physical Layer
            nextPhase = 'SERVER_UP';
            nextLayer = 1;
            delay = 3000; // Travel time
        } else if (phase === 'SERVER_UP') {
            if (layerId < 7) {
                nextLayer = layerId + 1;
            } else {
                nextPhase = 'SERVER_PROCESSING';
                nextLayer = 8;
                delay = 1000;
            }
        }

        // Schedule next step
        this.timer = setTimeout(() => {
            if (nextPhase !== phase || nextLayer !== layerId) {
                // Proceed if not finished
                if (nextPhase !== 'SERVER_PROCESSING') {
                    this.runStep(nextPhase, nextLayer);
                } else {
                    this.setMessage({ text: "Server Processing Request...", phase: 'SERVER_PROCESS' });
                    // End of this demo part
                }
            }
        }, delay);
    }

    togglePause() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            // Resume from current state?
            // runStep logic handles 'if (!this.isPlaying) return'
            // But we need to re-trigger the loop if it was stuck
            // For simplify, we just set the flag. runStep is called via timeouts which might have been cleared? 
            // Actually, if we clear timer on pause, we need to restart it.
            // Better approach: don't clear timer on pause, just pause execution.
            // But to "Resume" we need to re-call the step.
            this.runStep(this.currentPhase, this.currentLayerId);
        } else {
            clearTimeout(this.timer);
        }
        return this.isPlaying;
    }

    setSpeed(speedMultiplier) {
        // Base speed is 1500. Multiplier 2x means half delay.
        this.speed = 1500 / speedMultiplier;
    }

    stop() {
        this.isPlaying = false;
        clearTimeout(this.timer);
    }
}
