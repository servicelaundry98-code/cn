import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOPICS } from '../data/curriculum';
import { Lock, Play, Star } from 'lucide-react';
import OsiVisualizerScene from './OsiVisualizerScene';
import DevicesScene from './DevicesScene';
import TcpHandshakeScene from './TcpHandshakeScene';
import RoutingScene from './RoutingScene';
import DnsScene from './DnsScene';
import IntroScene from './IntroScene';
import SecurityScene from './SecurityScene';
import TcpIpScene from './TcpIpScene';
import UdpScene from './UdpScene';
import HttpScene from './HttpScene';
import DhcpScene from './DhcpScene';
import SubnettingScene from './SubnettingScene';
import Ipv6Scene from './Ipv6Scene';
import ArpScene from './ArpScene';
import NatScene from './NatScene';
import IcmpScene from './IcmpScene';
import VlanScene from './VlanScene';
import WirelessScene from './WirelessScene';
import CryptoScene from './CryptoScene';
import AdvancedSecurityScene from './AdvancedSecurityScene';

const UniverseDashboard = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    // If a topic is selected and active, render its scene
    if (selectedTopic && selectedTopic.status === 'active') {
        return (
            <div className="relative w-full h-screen">
                {selectedTopic.id === 'intro' && <IntroScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'osi' && <OsiVisualizerScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'devices' && <DevicesScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'tcp-handshake' && <TcpHandshakeScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'tcp-vs-udp' && <UdpScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'routing' && <RoutingScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'dns' && <DnsScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'http' && <HttpScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'dhcp' && <DhcpScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'subnetting' && <SubnettingScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'ipv6' && <Ipv6Scene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'arp' && <ArpScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'nat' && <NatScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'icmp' && <IcmpScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'vlans' && <VlanScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'wireless' && <WirelessScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'crypto' && <CryptoScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'advanced-security' && <AdvancedSecurityScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'security' && <SecurityScene onBack={() => setSelectedTopic(null)} />}
                {selectedTopic.id === 'tcp-ip' && <TcpIpScene onBack={() => setSelectedTopic(null)} />}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020205] text-white font-inter overflow-y-auto overflow-x-hidden relative">

            {/* Background Stars */}
            <div className="fixed inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-[#020205] to-black" />
            <div className="fixed inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 text-center">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl font-black bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                        NETWORK UNIVERSE
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Master Computer Networks through the laws of Anti-Gravity Physics.
                    </p>
                </motion.div>
            </div>

            {/* Grid of Topics */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TOPICS.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                            relative group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300
                            ${topic.status === 'active'
                                ? 'bg-white/5 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-pointer'
                                : 'bg-white/0 border-white/5 opacity-60 grayscale cursor-not-allowed'
                            }
                        `}
                        onClick={() => topic.status === 'active' && setSelectedTopic(topic)}
                    >
                        {/* Orbit Ring Decoration */}
                        <div className="absolute top-4 right-4 text-white/20 group-hover:text-cyan-400 transition-colors">
                            <topic.icon size={32} />
                        </div>

                        {/* Content */}
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${topic.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                                    topic.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                                        'bg-red-500/20 text-red-300'
                                    }`}>
                                    {topic.difficulty}
                                </span>
                                {topic.status === 'active' && (
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 animate-pulse">
                                        LIVE
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-200 transition-colors">
                                {topic.title}
                            </h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                {topic.description}
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-xs font-mono text-white/30">MODULE {index + 1}</span>

                            {topic.status === 'active' ? (
                                <button className="flex items-center gap-2 text-cyan-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                    LAUNCH <Play size={14} fill="currentColor" />
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 text-white/20 text-sm">
                                    <Lock size={14} /> LOCKED
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default UniverseDashboard;
