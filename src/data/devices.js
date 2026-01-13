import {
    Cpu, Share2, Network, Activity, ArrowRight, Zap
} from 'lucide-react';

export const DEVICE_TYPES = [
    {
        id: 'hub',
        name: 'Hub (Layer 1)',
        metaphor: 'The "Dumb" Repeater',
        description: 'Blindly broadcasts energy to everyone. Causes collisions.',
        icon: Share2,
        color: '#ef4444', // Red for dangerous/messy
        behavior: 'broadcast'
    },
    {
        id: 'switch',
        name: 'Switch (Layer 2)',
        metaphor: 'The Intelligent Sorter',
        description: 'Learns "Mac" identities. Sends distinct energy beams.',
        icon: Cpu,
        color: '#3b82f6', // Blue for intelligent/calm
        behavior: 'unicast'
    },
    {
        id: 'router',
        name: 'Router (Layer 3)',
        metaphor: 'The Inter-Galactic Gateway',
        description: 'Connects different networks. Makes logical decisions.',
        icon: Network,
        color: '#10b981', // Green for gateway/go
        behavior: 'route'
    }
];
