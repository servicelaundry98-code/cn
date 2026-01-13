import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Route, MapPin, ArrowRight, RefreshCcw, Activity, Info } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

// Simple Graph Topology
// A --(2)--> B --(4)--> D --(1)--> E
// |          |          |          ^
// +--(5)--> C --(1)--------+
const NODES = [
    { id: 'A', x: 50, y: 150, label: 'Origin (Start)' },
    { id: 'B', x: 200, y: 50, label: 'Router B' },
    { id: 'C', x: 200, y: 250, label: 'Router C' },
    { id: 'D', x: 400, y: 50, label: 'Router D' },
    { id: 'E', x: 550, y: 150, label: 'Destination' },
];

const EDGES = [
    { from: 'A', to: 'B', weight: 2 },
    { from: 'A', to: 'C', weight: 5 },
    { from: 'B', to: 'D', weight: 4 },
    { from: 'B', to: 'C', weight: 2 }, // Link between routers
    { from: 'C', to: 'E', weight: 6 }, // Long path
    { from: 'C', to: 'D', weight: 1 }, // Shortcut!
    { from: 'D', to: 'E', weight: 1 },
];

const RoutingScene = ({ onBack }) => {
    const [activePath, setActivePath] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [logs, setLogs] = useState([]);

    const logMessage = (msg) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`, ...prev]);
    };

    const runDijkstra = () => {
        setIsSimulating(true);
        setActivePath([]);
        setVisitedNodes([]);
        setLogs([]);

        logMessage("Starting Dijkstra's Algorithm...");
        logMessage("Initialize Distances: A=0, Others=∞");

        // 1. Visit A
        setTimeout(() => {
            setVisitedNodes(['A']);
            logMessage("Visiting Node A (Current Node)");
            logMessage("Checking neighbors of A: B(cost 2), C(cost 5)");
        }, 1000);

        // 2. Discover neighbors B and C
        setTimeout(() => {
            setVisitedNodes(['A', 'B', 'C']);
            logMessage("Updating tentative distances...");
            logMessage("-> Path to B = 2ms");
            logMessage("-> Path to C = 5ms");
        }, 2500);

        // 3. Process B 
        setTimeout(() => {
            setVisitedNodes(['A', 'B', 'C', 'D']);
            logMessage("Selecting unvisited node with smallest distance: Node B (2ms)");
            logMessage("Checking neighbors of B: D(4), C(2)");
            logMessage("Optimization Found: A->B->C is 2+2=4ms. (Better than direct A->C 5ms!)");
        }, 4500);

        // 4. Process C
        setTimeout(() => {
            logMessage("Selecting next node: Node C (4ms)");
            logMessage("Checking neighbors of C: D(1), E(6)");
            logMessage("Optimization Found: A->B->C->D is 4+1=5ms. (Better than A->B->D 6ms!)");
        }, 6500);

        // 5. Reach E
        setTimeout(() => {
            setVisitedNodes(['A', 'B', 'C', 'D', 'E']);
            setActivePath(['A', 'B', 'C', 'D', 'E']); // A -> B -> C -> D -> E
            setIsSimulating(false);
            logMessage("DESTINATION REACHED!");
            logMessage("Winning Path: A -> B -> C -> D -> E");
            logMessage("Total Latency Cost: 6ms");
        }, 8500);
    };

    const reset = () => {
        setActivePath([]);
        setVisitedNodes([]);
        setIsSimulating(false);
        setLogs([]);
    };

    // 1. THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-green-400 mb-2">Network Routing</h3>
                <p className="text-sm text-white/70">
                    The Internet is a mesh of interconnected routers. Finding the best path from Source to Destination is critical for speed.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">Dijkstra's Algorithm</h4>
                <p className="text-sm text-white/80">
                    Used by protocols like OSPF (Open Shortest Path First). It calculates the "Cost" to reach every node.
                </p>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 block text-xs uppercase mb-1">Key Concept: Latency Cost</strong>
                    <p className="text-xs text-white/60">
                        The "Shortest Path" isn't always the fewest hops.
                        A path with 3 fast links (1ms) is better than 1 slow link (100ms).
                    </p>
                </div>
            </div>

            {/* Weights Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-white/5 p-2 rounded text-center">
                    <div className="text-2xl font-bold text-white/20">∞</div>
                    <div className="text-[10px] uppercase text-white/40">Initial State</div>
                </div>
                <div className="bg-white/5 p-2 rounded text-center">
                    <div className="text-xl font-bold text-green-400">Min</div>
                    <div className="text-[10px] uppercase text-white/40">Target State</div>
                </div>
            </div>
        </div>
    );

    // 2. VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="relative w-[600px] h-[300px] border border-white/5 bg-black/20 rounded-xl">

                {/* Edges */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible">
                    {EDGES.map((edge, i) => {
                        const start = NODES.find(n => n.id === edge.from);
                        const end = NODES.find(n => n.id === edge.to);

                        // Is this edge part of the winning path?
                        // Path is ordered array ['A', 'B', 'C'...]
                        // An edge matches if 'from' is at index i and 'to' is at index i+1
                        const fromIndex = activePath.indexOf(edge.from);
                        const toIndex = activePath.indexOf(edge.to);
                        const isWinning = fromIndex !== -1 && toIndex !== -1 && toIndex === fromIndex + 1;

                        return (
                            <g key={i}>
                                <line
                                    x1={start.x} y1={start.y}
                                    x2={end.x} y2={end.y}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                />
                                {/* Weight Label */}
                                <rect x={(start.x + end.x) / 2 - 10} y={(start.y + end.y) / 2 - 8} width="20" height="16" fill="#000" rx="4" />
                                <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2 + 4} fill="#aaa" fontSize="10" textAnchor="middle">{edge.weight}</text>

                                {isWinning && (
                                    <motion.line
                                        x1={start.x} y1={start.y}
                                        x2={end.x} y2={end.y}
                                        stroke="#4ade80"
                                        strokeWidth="4"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: fromIndex * 0.5 }}
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Nodes */}
                {NODES.map((node) => {
                    const isVisited = visitedNodes.includes(node.id);
                    const isWinning = activePath.includes(node.id);

                    return (
                        <div
                            key={node.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                            style={{ left: node.x, top: node.y }}
                        >
                            <motion.div
                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-[#0a0a15] z-10 transition-colors duration-300
                                    ${isWinning ? 'border-green-400 shadow-[0_0_15px_#4ade80] scale-110' :
                                        isVisited ? 'border-blue-400' : 'border-white/20'}
                                `}
                                animate={{ scale: isVisited ? [1, 1.2, 1] : 1 }}
                            >
                                <span className={`font-bold text-sm ${isWinning ? 'text-green-400' : 'text-white'}`}>{node.id}</span>
                            </motion.div>
                            <span className="absolute top-12 whitespace-nowrap text-[10px] text-white/30 font-mono bg-black/50 px-1 rounded">{node.label}</span>
                        </div>
                    );
                })}

            </div>
        </div>
    );

    // 3. TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-2">
                <button
                    onClick={runDijkstra}
                    disabled={isSimulating || activePath.length > 0}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Route size={16} /> CALCULATE
                </button>
                <button
                    onClick={reset}
                    className="px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all flex items-center justify-center"
                >
                    <RefreshCcw size={16} />
                </button>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Algorithm Trace</span>
                    <Activity size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Click Calculate to run simulation...</span>}
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/70 border-l-2 border-green-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="Routing (Dijkstra)"
            subtitle="Module 5: Finding the Fastest Path"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default RoutingScene;
