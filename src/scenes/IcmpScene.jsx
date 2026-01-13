import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Activity, Zap, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const IcmpScene = ({ onBack }) => {
    const [pingTarget, setPingTarget] = useState('8.8.8.8');
    const [pingResults, setPingResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ sent: 0, received: 0, lost: 0, min: 0, max: 0, avg: 0 });

    const logMessage = (msg, type = 'info') => {
        const icon = type === 'request' ? '📤' : type === 'reply' ? '✅' : type === 'timeout' ? '❌' : '📡';
        setLogs(prev => [`${icon} ${msg}`, ...prev].slice(0, 15));
    };

    const runPing = async () => {
        setIsRunning(true);
        setPingResults([]);
        setLogs([]);
        setStats({ sent: 0, received: 0, lost: 0, min: 0, max: 0, avg: 0 });

        logMessage(`🎯 Pinging ${pingTarget}...`, 'info');
        logMessage('📡 Sending ICMP Echo Request packets', 'info');

        const results = [];
        let totalTime = 0;
        let minTime = Infinity;
        let maxTime = 0;
        let received = 0;

        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate ping with 80% success rate
            const success = Math.random() > 0.2;
            const time = success ? Math.floor(Math.random() * 50) + 10 : null;
            const ttl = 64 - Math.floor(Math.random() * 10);

            if (success && time !== null) {
                logMessage(`📤 Request ${i}: Sent (32 bytes)`, 'request');
                await new Promise(resolve => setTimeout(resolve, time));
                logMessage(`✅ Reply ${i}: ${time}ms, TTL=${ttl}`, 'reply');

                results.push({ seq: i, time, ttl, status: 'success' });
                totalTime += time;
                received++;
                minTime = Math.min(minTime, time);
                maxTime = Math.max(maxTime, time);
            } else {
                logMessage(`📤 Request ${i}: Sent (32 bytes)`, 'request');
                await new Promise(resolve => setTimeout(resolve, 1000));
                logMessage(`❌ Request ${i}: Timeout (no response)`, 'timeout');
                results.push({ seq: i, time: null, ttl: null, status: 'timeout' });
            }

            setPingResults([...results]);
        }

        const avgTime = received > 0 ? Math.floor(totalTime / received) : 0;
        const lost = 5 - received;

        setStats({
            sent: 5,
            received,
            lost,
            min: received > 0 ? minTime : 0,
            max: received > 0 ? maxTime : 0,
            avg: avgTime
        });

        logMessage('', 'info');
        logMessage(`📊 Ping Statistics for ${pingTarget}:`, 'info');
        logMessage(`   Packets: Sent = 5, Received = ${received}, Lost = ${lost} (${(lost / 5 * 100).toFixed(0)}% loss)`, 'info');
        if (received > 0) {
            logMessage(`   Round-trip times: Min = ${minTime}ms, Max = ${maxTime}ms, Avg = ${avgTime}ms`, 'info');
        }

        setIsRunning(false);
    };

    const showTraceroute = () => {
        setLogs([]);
        logMessage('🗺️ TRACEROUTE Demo to google.com', 'info');
        logMessage('Tracing route with max 10 hops...', 'info');

        const hops = [
            { hop: 1, ip: '192.168.1.1', name: 'router.local', time: 2 },
            { hop: 2, ip: '10.0.0.1', name: 'isp-gateway', time: 8 },
            { hop: 3, ip: '203.0.113.1', name: 'isp-core', time: 15 },
            { hop: 4, ip: '198.51.100.1', name: 'backbone-1', time: 25 },
            { hop: 5, ip: '8.8.8.8', name: 'google-dns', time: 35 }
        ];

        hops.forEach((hop, index) => {
            setTimeout(() => {
                logMessage(`${hop.hop}  ${hop.time}ms  ${hop.ip} (${hop.name})`, 'reply');
            }, (index + 1) * 1000);
        });

        setTimeout(() => {
            logMessage('✅ Trace complete! Found route in 5 hops', 'info');
        }, 6000);
    };

    const showIcmpTypes = () => {
        setLogs([]);
        logMessage('📚 ICMP Message Types', 'info');

        setTimeout(() => {
            logMessage('Type 0: Echo Reply (Ping response)', 'info');
        }, 500);
        setTimeout(() => {
            logMessage('Type 3: Destination Unreachable', 'info');
        }, 1000);
        setTimeout(() => {
            logMessage('Type 5: Redirect Message', 'info');
        }, 1500);
        setTimeout(() => {
            logMessage('Type 8: Echo Request (Ping)', 'info');
        }, 2000);
        setTimeout(() => {
            logMessage('Type 11: Time Exceeded (TTL=0)', 'info');
        }, 2500);
    };

    // THEORY CONTENT
    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">ICMP - Internet Control Message Protocol</h3>
                <p className="text-sm text-white/70">
                    Network diagnostics aur error reporting ke liye. Ping aur Traceroute ICMP use karte hain.
                    Network troubleshooting ka sabse important tool! 🔧
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    What is ICMP?
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">Purpose</strong>
                    <p className="text-xs text-white/60">
                        ICMP network layer protocol hai jo error messages aur operational information provide karta hai.
                        Yeh data transfer nahi karta, sirf network status check karta hai.
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">Common Uses</strong>
                    <ul className="text-xs text-white/60 space-y-1 ml-4 list-disc">
                        <li><strong>Ping:</strong> Host reachable hai ya nahi</li>
                        <li><strong>Traceroute:</strong> Packet ka route kya hai</li>
                        <li><strong>Error Reporting:</strong> Destination unreachable</li>
                        <li><strong>Network Diagnostics:</strong> Latency, packet loss</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Ping Command
                </h4>

                <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/30">
                    <div className="text-xs font-mono text-cyan-300 mb-2">$ ping google.com</div>
                    <div className="space-y-1 text-xs text-white/60">
                        <div>• Sends ICMP Echo Request (Type 8)</div>
                        <div>• Waits for Echo Reply (Type 0)</div>
                        <div>• Measures round-trip time (RTT)</div>
                        <div>• Shows packet loss percentage</div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Traceroute
                </h4>

                <div className="bg-purple-500/10 p-3 rounded border border-purple-500/30">
                    <div className="text-xs font-mono text-purple-300 mb-2">$ traceroute google.com</div>
                    <div className="space-y-1 text-xs text-white/60">
                        <div>• Shows complete path to destination</div>
                        <div>• Uses TTL (Time To Live) trick</div>
                        <div>• Each hop sends "Time Exceeded"</div>
                        <div>• Identifies slow routers</div>
                    </div>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>⚠️ Security Note:</strong> Kuch firewalls ICMP block karte hain security ke liye.
                Isliye ping fail ho sakta hai even if host online hai.
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">ICMP Message Types:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">Type 0</strong>
                        <p className="text-white/50 text-[10px]">Echo Reply</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-blue-400">Type 8</strong>
                        <p className="text-white/50 text-[10px]">Echo Request</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-red-400">Type 3</strong>
                        <p className="text-white/50 text-[10px]">Dest Unreachable</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-yellow-400">Type 11</strong>
                        <p className="text-white/50 text-[10px]">Time Exceeded</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // VISUAL CONTENT
    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* Ping Visualization */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-cyan-400" />
                        Ping Simulator
                    </h3>

                    <div className="mb-4">
                        <label className="text-xs text-white/50 block mb-2">Target Host:</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pingTarget}
                                onChange={(e) => setPingTarget(e.target.value)}
                                placeholder="8.8.8.8 or google.com"
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                                disabled={isRunning}
                            />
                            <button
                                onClick={runPing}
                                disabled={isRunning}
                                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                            >
                                {isRunning ? 'Pinging...' : 'Ping'}
                            </button>
                        </div>
                    </div>

                    {/* Ping Results */}
                    {pingResults.length > 0 && (
                        <div className="space-y-2">
                            {pingResults.map((result) => (
                                <div
                                    key={result.seq}
                                    className={`p-3 rounded-lg border ${result.status === 'success'
                                            ? 'bg-green-500/10 border-green-500/30'
                                            : 'bg-red-500/10 border-red-500/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            {result.status === 'success' ? (
                                                <CheckCircle size={16} className="text-green-400" />
                                            ) : (
                                                <XCircle size={16} className="text-red-400" />
                                            )}
                                            <span className="text-white font-mono">
                                                Reply from {pingTarget}: seq={result.seq}
                                            </span>
                                        </div>
                                        {result.status === 'success' ? (
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className="text-cyan-400">time={result.time}ms</span>
                                                <span className="text-purple-400">TTL={result.ttl}</span>
                                            </div>
                                        ) : (
                                            <span className="text-red-400 text-xs">Request timed out</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Statistics */}
                    {stats.sent > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/30">
                                <div className="text-xs text-blue-300 mb-1">Packets</div>
                                <div className="space-y-1 text-xs font-mono">
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Sent:</span>
                                        <span className="text-white">{stats.sent}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Received:</span>
                                        <span className="text-green-400">{stats.received}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Lost:</span>
                                        <span className="text-red-400">{stats.lost} ({((stats.lost / stats.sent) * 100).toFixed(0)}%)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/30">
                                <div className="text-xs text-purple-300 mb-1">Round-trip Time</div>
                                <div className="space-y-1 text-xs font-mono">
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Min:</span>
                                        <span className="text-green-400">{stats.min}ms</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Avg:</span>
                                        <span className="text-cyan-400">{stats.avg}ms</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/50">Max:</span>
                                        <span className="text-orange-400">{stats.max}ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={showTraceroute}
                        className="py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <TrendingUp size={18} /> Traceroute Demo
                    </button>
                    <button
                        onClick={showIcmpTypes}
                        className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <AlertTriangle size={18} /> ICMP Types
                    </button>
                </div>
            </div>
        </div>
    );

    // TELEMETRY CONTENT
    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Common Targets</h4>
                <div className="space-y-2">
                    {['8.8.8.8', '1.1.1.1', 'google.com', 'github.com'].map((target) => (
                        <button
                            key={target}
                            onClick={() => setPingTarget(target)}
                            disabled={isRunning}
                            className={`w-full text-left px-3 py-2 rounded transition-all text-xs ${pingTarget === target
                                    ? 'bg-cyan-500/20 border border-cyan-500'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="font-mono text-white">{target}</div>
                            <div className="text-white/50 text-[10px]">
                                {target === '8.8.8.8' ? 'Google DNS' :
                                    target === '1.1.1.1' ? 'Cloudflare DNS' :
                                        target === 'google.com' ? 'Google Search' :
                                            'GitHub'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>ICMP Log</span>
                    <Activity size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                    {logs.length === 0 && <span className="text-white/20 italic">Enter target and click Ping...</span>}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className="text-white/70 border-l-2 border-cyan-500/30 pl-2 pb-1 leading-relaxed"
                        >
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200 border border-blue-500/30">
                <strong>💡 Pro Tip:</strong> Low ping = Good connection. High ping = Lag in gaming!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="ICMP & Ping"
            subtitle="Ch 16: Network Diagnostics & Troubleshooting"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default IcmpScene;
