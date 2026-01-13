
import {
    Globe, Network, Layers, Box, Server, Activity,
    Shield, Lock, Zap, Route, Cpu, Map, Hash,
    Wifi, Radio, AlertTriangle
} from 'lucide-react';

export const TOPICS = [
    // CHAPTER 1: INTRO & LAYERS
    {
        id: 'intro',
        title: "Chapter 1: The Internet",
        description: "Network Edge, Core, and Order out of Chaos.",
        icon: Network,
        status: 'active',
        difficulty: 'Beginner',
        sceneComponent: 'IntroScene'
    },
    {
        id: 'osi',
        title: "Ch 1.5: The OSI Model",
        description: "Protocol Layers and Service Models.",
        icon: Layers,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'OsiVisualizerScene'
    },
    {
        id: 'tcp-ip',
        title: "Ch 1.6: TCP/IP Stack",
        description: "The Practical 4-Layer Internet Architecture.",
        icon: Globe,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'TcpIpScene'
    },

    // CHAPTER 2: APPLICATION LAYER
    {
        id: 'dns',
        title: "Chapter 2: Application Layer",
        description: "DNS Resolution: The Internet's Directory.",
        icon: Map,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'DnsScene'
    },

    // CHAPTER 3: TRANSPORT LAYER
    {
        id: 'tcp-udp',
        title: "Chapter 3: Transport Layer",
        description: "TCP Reliability & The 3-Way Handshake.",
        icon: Activity,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'TcpHandshakeScene'
    },

    // CHAPTER 4: NETWORK LAYER
    {
        id: 'routing',
        title: "Chapter 4: Network Layer",
        description: "Routing Algorithms (Dijkstra) & Pathfinding.",
        icon: Route,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'RoutingScene'
    },

    // CHAPTER 5: LINK LAYER
    {
        id: 'devices',
        title: "Chapter 5: Link Layer",
        description: "Switches, Hubs, and LAN Hardware.",
        icon: Cpu,
        status: 'active',
        difficulty: 'Beginner',
        sceneComponent: 'DevicesScene'
    },

    // CHAPTER 8: SECURITY
    {
        id: 'security',
        title: "Chapter 8: Security",
        description: "Firewalls, Filtering, and Threats.",
        icon: Shield,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'SecurityScene'
    }
];
