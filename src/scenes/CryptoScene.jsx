import React, { useState } from 'react';
import { Lock, Unlock, Key, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import LessonLayout from '../ui/LessonLayout';

const CryptoScene = ({ onBack }) => {
    const [plaintext, setPlaintext] = useState('Hello World');
    const [ciphertext, setCiphertext] = useState('');
    const [encryptionType, setEncryptionType] = useState('AES');
    const [showKey, setShowKey] = useState(false);
    const [logs, setLogs] = useState([]);

    const logMessage = (msg) => {
        setLogs(prev => [`• ${msg}`, ...prev].slice(0, 12));
    };

    const caesarCipher = (text, shift = 3) => {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = code >= 65 && code <= 90;
                const base = isUpperCase ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char;
        }).join('');
    };

    const simpleEncrypt = () => {
        setLogs([]);
        logMessage('🔐 Starting encryption...');

        setTimeout(() => {
            const encrypted = caesarCipher(plaintext, 3);
            setCiphertext(encrypted);
            logMessage(`📝 Plaintext: "${plaintext}"`);
        }, 500);

        setTimeout(() => {
            logMessage(`🔑 Using ${encryptionType} algorithm`);
        }, 1000);

        setTimeout(() => {
            logMessage('🔄 Applying encryption transformation...');
        }, 1500);

        setTimeout(() => {
            logMessage(`✅ Ciphertext: "${caesarCipher(plaintext, 3)}"`);
            logMessage('🎉 Encryption complete!');
        }, 2000);
    };

    const demonstrateTLS = () => {
        setLogs([]);
        logMessage('🌐 TLS Handshake Demo (HTTPS)');

        setTimeout(() => logMessage('1️⃣ Client Hello → Server'), 500);
        setTimeout(() => logMessage('2️⃣ Server Hello + Certificate ← Server'), 1000);
        setTimeout(() => logMessage('3️⃣ Verify Certificate (CA check)'), 1500);
        setTimeout(() => logMessage('4️⃣ Generate Session Key'), 2000);
        setTimeout(() => logMessage('5️⃣ Encrypted Session Key → Server'), 2500);
        setTimeout(() => logMessage('✅ Secure connection established!'), 3000);
        setTimeout(() => logMessage('🔒 All data now encrypted'), 3500);
    };

    const demonstrateHashing = () => {
        setLogs([]);
        logMessage('🔐 Hashing Demo');

        setTimeout(() => logMessage('Input: "password123"'), 500);
        setTimeout(() => logMessage('Algorithm: SHA-256'), 1000);
        setTimeout(() => logMessage('Hash: ef92b778...a1b2c3d4 (64 chars)'), 1500);
        setTimeout(() => logMessage('✅ One-way function - cannot reverse!'), 2000);
        setTimeout(() => logMessage('💡 Used for password storage'), 2500);
    };

    const theoryContent = (
        <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Cryptography</h3>
                <p className="text-sm text-white/70">
                    Data ko secret code mein convert karna. Encryption se data secure hota hai.
                    Bina key ke koi nahi padh sakta! 🔐
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-white/10 pb-2">
                    Types of Cryptography
                </h4>

                <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3">
                    <strong className="text-blue-300 text-sm block mb-1">Symmetric Encryption</strong>
                    <p className="text-xs text-white/60">
                        Same key for encryption and decryption. Fast but key sharing risky.
                        Example: AES, DES
                    </p>
                </div>

                <div className="bg-green-500/10 border-l-2 border-green-500 p-3">
                    <strong className="text-green-300 text-sm block mb-1">Asymmetric Encryption</strong>
                    <p className="text-xs text-white/60">
                        Public key (encrypt) aur Private key (decrypt). Secure but slow.
                        Example: RSA, ECC
                    </p>
                </div>

                <div className="bg-purple-500/10 border-l-2 border-purple-500 p-3">
                    <strong className="text-purple-300 text-sm block mb-1">Hashing</strong>
                    <p className="text-xs text-white/60">
                        One-way function. Data ko fixed-size hash mein convert karta hai.
                        Example: SHA-256, MD5
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase">Common Algorithms:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-cyan-400">AES</strong>
                        <p className="text-white/50 text-[10px]">Symmetric, very secure</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-green-400">RSA</strong>
                        <p className="text-white/50 text-[10px]">Asymmetric, widely used</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-purple-400">SHA-256</strong>
                        <p className="text-white/50 text-[10px]">Hashing, Bitcoin uses</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <strong className="text-orange-400">TLS/SSL</strong>
                        <p className="text-white/50 text-[10px]">HTTPS security</p>
                    </div>
                </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded text-xs text-orange-200 border border-orange-500/30">
                <strong>⚠️ Security:</strong> Never use weak algorithms like DES or MD5.
                Always use AES-256 or RSA-2048+!
            </div>
        </div>
    );

    const visualContent = (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-6">
                {/* Encryption Demo */}
                <div className="bg-black/20 rounded-xl border border-white/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Lock size={20} className="text-purple-400" />
                        Encryption Demo
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-white/50 block mb-2">Plaintext (Original Message):</label>
                            <input
                                type="text"
                                value={plaintext}
                                onChange={(e) => setPlaintext(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                placeholder="Enter message..."
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {['AES', 'RSA', 'DES'].map((algo) => (
                                <button
                                    key={algo}
                                    onClick={() => setEncryptionType(algo)}
                                    className={`py-2 rounded-lg font-bold text-sm transition-all ${encryptionType === algo
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/5 text-white/50 hover:bg-white/10'
                                        }`}
                                >
                                    {algo}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={simpleEncrypt}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Lock size={18} /> Encrypt Message
                        </button>

                        {ciphertext && (
                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs text-purple-300 font-bold">Ciphertext (Encrypted):</label>
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                    >
                                        {showKey ? <EyeOff size={12} /> : <Eye size={12} />}
                                        {showKey ? 'Hide' : 'Show'} Key
                                    </button>
                                </div>
                                <div className="font-mono text-sm text-white bg-black/40 p-3 rounded break-all">
                                    {ciphertext}
                                </div>
                                {showKey && (
                                    <div className="mt-2 text-xs text-purple-300">
                                        🔑 Key: Caesar Cipher (Shift: 3)
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Encryption Types */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30 text-center">
                        <Key size={32} className="text-blue-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white mb-1">Symmetric</div>
                        <div className="text-xs text-white/50">Same key for both</div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30 text-center">
                        <Shield size={32} className="text-green-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white mb-1">Asymmetric</div>
                        <div className="text-xs text-white/50">Public + Private keys</div>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30 text-center">
                        <CheckCircle size={32} className="text-purple-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white mb-1">Hashing</div>
                        <div className="text-xs text-white/50">One-way function</div>
                    </div>
                </div>

                {/* Quick Demos */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={demonstrateTLS}
                        className="py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Lock size={18} /> TLS Handshake
                    </button>
                    <button
                        onClick={demonstrateHashing}
                        className="py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Shield size={18} /> Hashing Demo
                    </button>
                </div>
            </div>
        </div>
    );

    const telemetryContent = (
        <div className="flex flex-col h-full gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white/50 uppercase mb-3">Key Sizes</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                        <span className="text-white/70">AES-128:</span>
                        <span className="text-green-400">✅ Good</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/70">AES-256:</span>
                        <span className="text-green-400">✅ Best</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/70">RSA-2048:</span>
                        <span className="text-green-400">✅ Secure</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-white/70">RSA-4096:</span>
                        <span className="text-green-400">✅ Very Secure</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0f0f16] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="p-3 bg-white/5 text-xs font-bold uppercase text-white/50">
                    Crypto Activity Log
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
                <strong>💡 Did You Know:</strong> AES-256 would take billions of years to crack!
            </div>
        </div>
    );

    return (
        <LessonLayout
            title="Cryptography"
            subtitle="Ch 19: Encryption, Hashing & Security"
            theoryContent={theoryContent}
            visualContent={visualContent}
            telemetryContent={telemetryContent}
            onBack={onBack}
        />
    );
};

export default CryptoScene;
