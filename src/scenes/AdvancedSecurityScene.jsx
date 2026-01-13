import React, { useState } from 'react';
import { Shield, AlertTriangle, Bug, Lock, Zap, Eye, Target } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const AdvancedSecurityScene = ({ onBack }) => {
    const [selectedAttack, setSelectedAttack] = useState(null);
    const [logs, setLogs] = useState([]);

    const attacks = [
        {
            id: 'ddos',
            name: 'DDoS Attack',
            icon: Zap,
            color: 'red',
            description: 'Distributed Denial of Service - Server ko overwhelm kar dena',
            steps: [
                '🤖 Botnet of 10,000 infected computers',
                '📤 Sending 1 million requests/second',
                '⚠️ Server CPU: 100%, Memory: 100%',
                '❌ Legitimate users cannot access',
                '🛡️ Defense: Rate limiting, CDN, Firewall'
            ]
        },
        {
            id: 'mitm',
            name: 'Man-in-the-Middle',
            icon: Eye,
            color: 'orange',
            description: 'Attacker beech mein aake data intercept karta hai',
            steps: [
                '👤 Alice wants to talk to Bob',
                '🦹 Attacker intercepts communication',
                '📡 Alice → Attacker → Bob',
                '👁️ Attacker reads all messages',
                '🛡️ Defense: HTTPS, VPN, Certificate pinning'
            ]
        },
        {
            id: 'sql-injection',
            name: 'SQL Injection',
            icon: Bug,
            color: 'purple',
            description: 'Database query mein malicious code inject karna',
            steps: [
                '📝 Login form: username = "admin"',
                '💉 Password = "1\' OR \'1\'=\'1"',
                '🔓 Query: SELECT * WHERE user=\'admin\' AND pass=\'1\' OR \'1\'=\'1\'',
                '✅ Always true! Login bypassed',
                '🛡️ Defense: Prepared statements, Input validation'
            ]
        },
        {
            id: 'phishing',
            name: 'Phishing',
            icon: Target,
            color: 'yellow',
            description: 'Fake emails/websites se credentials churaana',
            steps: [
                '📧 Email: "Your account will be suspended!"',
                '🔗 Link: http://paypa1.com (fake)',
                '🎣 User enters password',
                '🦹 Attacker steals credentials',
                '🛡️ Defense: Check URLs, Enable 2FA, Security training'
            ]
        }
    ];

    const defenses = [
        { name: 'Firewall', description: 'Unwanted traffic block karta hai', icon: Shield },
        { name: 'IDS/IPS', description: 'Intrusion detect aur prevent karta hai', icon: Eye },
        { name: 'VPN', description: 'Encrypted tunnel banata hai', icon: Lock },
        { name: '2FA', description: 'Two-factor authentication', icon: Zap }
    ];

    const logMessage = (msg) => {
        setLogs(prev => [`• ${msg}`, ...prev].slice(0, 15));
    };

    const demonstrateAttack = (attack) => {
        setSelectedAttack(attack);
        setLogs([]);
        logMessage(`⚠️ ${attack.name} Attack Simulation`);

        attack.steps.forEach((step, index) => {
            setTimeout(() => {
                logMessage(step);
            }, (index + 1) * 1000);
        });
    };

    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-red-400 mb-2">Advanced Network Security</h3>
                <p className="text-sm text-white/70">
                    Common attacks aur unse bachne ke tarike. Cyber security fundamentals -
                    har network engineer ko pata hona chahiye! 🛡️
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Common Attacks
                </h4>

                <div className="bg-red-500/10 border-l-2 border-red-500 p-3">
                    <strong className="text-red-300 text-sm block mb-1">DDoS (Distributed Denial of Service)</strong>
                    <p className="text-xs text-white/60">
                        Bahut saare computers se ek saath attack. Server crash ho jata hai.
                    </p>
                </div>

                <div className="bg-orange-500/10 border-l-2 border-orange-500 p-3">
                    <strong className="text-orange-300 text-sm block mb-1">Man-in-the-Middle (MITM)</strong>
                    <p className="text-xs text-white/60">
                        Attacker beech mein aake communication intercept karta hai.
                    </p>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                    <strong className="text-purple-300 text-sm block mb-1">SQL Injection</strong>
                    <p className="text-xs text-white/60">
                        Database query mein malicious code inject karke data churaana.
                    </p>
                </div>

                <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-3">
                    <strong className="text-yellow-300 text-sm block mb-1">Phishing</strong>
                    <p className="text-xs text-white/60">
                        Fake emails/websites se users ko trick karke credentials churaana.
                    </p>
                </div>
            </div>

            <div className="bg-red-900/20 p-4 rounded text-xs text-red-200 border border-red-500/30">
                <strong>⚠️ Warning:</strong> These are educational demos only.
                Never use these techniques for malicious purposes!
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Defense Layers:</h4>
                <div className="space-y-1 text-xs">
                    <div className="bg-white/5 p-2 rounded flex items-center gap-2">
                        <Shield size={14} className="text-blue-400" />
                        <span className="text-white/70">Firewall - First line of defense</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex items-center gap-2">
                        <Lock size={14} className="text-green-400" />
                        <span className="text-white/70">Encryption - Protect data in transit</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded flex items-center gap-2">
                        <Eye size={14} className="text-purple-400" />
                        <span className="text-white/70">Monitoring - Detect anomalies</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* Attack Types */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-400" />
                        Common Network Attacks
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {attacks.map((attack) => {
                            const Icon = attack.icon;
                            return (
                                <button
                                    key={attack.id}
                                    onClick={() => demonstrateAttack(attack)}
                                    className={`p-4 rounded-xl border-2 transition-all text-left ${selectedAttack?.id === attack.id
                                            ? `border-${attack.color}-500 bg-${attack.color}-500/20`
                                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon size={24} className={`text-${attack.color}-400`} />
                                        <div className="font-bold text-white">{attack.name}</div>
                                    </div>
                                    <div className="text-xs text-white/60">{attack.description}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Defense Mechanisms */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-green-400" />
                        Defense Mechanisms
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                        {defenses.map((defense) => {
                            const Icon = defense.icon;
                            return (
                                <div
                                    key={defense.name}
                                    className="bg-green-500/10 p-3 rounded-xl border border-green-500/30 text-center"
                                >
                                    <Icon size={24} className="text-green-400 mx-auto mb-2" />
                                    <div className="text-xs font-bold text-white mb-1">{defense.name}</div>
                                    <div className="text-[10px] text-white/50">{defense.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Security Best Practices */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Security Best Practices</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                            <div className="font-bold text-blue-300 mb-1">✅ Use Strong Passwords</div>
                            <div className="text-white/60">12+ characters, mixed case, symbols</div>
                        </div>
                        <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                            <div className="font-bold text-green-300 mb-1">✅ Enable 2FA</div>
                            <div className="text-white/60">Two-factor authentication everywhere</div>
                        </div>
                        <div className="bg-purple-500/10 p-3 rounded border border-purple-500/30">
                            <div className="font-bold text-purple-300 mb-1">✅ Keep Software Updated</div>
                            <div className="text-white/60">Patch vulnerabilities regularly</div>
                        </div>
                        <div className="bg-orange-500/10 p-3 rounded border border-orange-500/30">
                            <div className="font-bold text-orange-300 mb-1">✅ Use VPN on Public WiFi</div>
                            <div className="text-white/60">Encrypt your traffic</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Security Layers</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-white/70">Network Layer (Firewall)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-white/70">Transport Layer (TLS/SSL)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-white/70">Application Layer (WAF)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-white/70">User Layer (Authentication)</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50 flex items-center justify-between">
                    <span>Attack Simulation Log</span>
                    <AlertTriangle size={12} />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
                    {logs.length === 0 && (
                        <span className="text-white/20 italic">Click an attack to see simulation...</span>
                    )}
                    {logs.map((log, i) => (
                        <div key={i} className="text-white/70 border-l-2 border-red-500/30 pl-2">
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-red-900/20 p-3 rounded text-xs text-red-200 border border-red-500/30">
                <strong>⚠️ Remember:</strong> Security is a continuous process, not a one-time setup!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="Advanced Security"
            subtitle="Ch 20: Attacks, Defenses & Best Practices"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default AdvancedSecurityScene;
