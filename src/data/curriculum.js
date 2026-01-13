
import {
    Globe, Network, Layers, Box, Server, Activity,
    Shield, Lock, Zap, Route, Cpu, Map, Hash,
    Wifi, Radio, AlertTriangle, Search, RefreshCw
} from 'lucide-react';

export const TOPICS = [
    // CHAPTER 1: INTRO & LAYERS
    {
        id: 'intro',
        title: "Ch 1: Introduction to Networks",
        description: "Network Edge, Core, and Order out of Chaos.",
        icon: Network,
        status: 'active',
        difficulty: 'Beginner',
        sceneComponent: 'IntroScene'
    },
    {
        id: 'osi',
        title: "Ch 2: The OSI Model",
        description: "Protocol Layers and Service Models.",
        icon: Layers,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'OsiVisualizerScene'
    },
    {
        id: 'tcp-ip',
        title: "Ch 3: TCP/IP Stack",
        description: "The Practical 4-Layer Internet Architecture.",
        icon: Globe,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'TcpIpScene'
    },

    // CHAPTER 4-8: APPLICATION LAYER
    {
        id: 'dns',
        title: "Ch 4: DNS Resolution",
        description: "DNS Resolution: The Internet's Directory.",
        icon: Map,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'DnsScene'
    },
    {
        id: 'http',
        title: "Ch 5: HTTP/HTTPS",
        description: "Web Protocols: Secure vs Insecure Communication.",
        icon: Globe,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'HttpScene'
    },
    {
        id: 'dhcp',
        title: "Ch 6: DHCP",
        description: "Automatic IP Assignment: The DORA Process.",
        icon: Wifi,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'DhcpScene'
    },
    {
        id: 'subnetting',
        title: "Ch 7: Subnetting",
        description: "IP Subnetting: Network Division & Planning.",
        icon: Hash,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'SubnettingScene'
    },
    {
        id: 'ipv6',
        title: "Ch 8: IPv6",
        description: "Next Generation IP: The Future of Internet.",
        icon: Globe,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'Ipv6Scene'
    },

    // CHAPTER 9-10: TRANSPORT LAYER
    {
        id: 'tcp-handshake',
        title: "Ch 9: TCP Handshake",
        description: "TCP Reliability & The 3-Way Handshake.",
        icon: Activity,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'TcpHandshakeScene'
    },
    {
        id: 'tcp-vs-udp',
        title: "Ch 10: TCP vs UDP",
        description: "Reliable vs Fast: The Great Protocol Race.",
        icon: Zap,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'UdpScene'
    },

    // CHAPTER 11: NETWORK LAYER
    {
        id: 'routing',
        title: "Ch 11: Routing Algorithms",
        description: "Routing Algorithms (Dijkstra) & Pathfinding.",
        icon: Route,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'RoutingScene'
    },

    // CHAPTER 12-13: LINK LAYER
    {
        id: 'devices',
        title: "Ch 12: Network Devices",
        description: "Switches, Hubs, and LAN Hardware.",
        icon: Cpu,
        status: 'active',
        difficulty: 'Beginner',
        sceneComponent: 'DevicesScene'
    },
    {
        id: 'arp',
        title: "Ch 13: ARP Protocol",
        description: "Address Resolution: IP to MAC Mapping.",
        icon: Search,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'ArpScene'
    },

    // CHAPTER 14: SECURITY
    {
        id: 'security',
        title: "Ch 14: Network Security",
        description: "Firewalls, Filtering, and Threats.",
        icon: Shield,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'SecurityScene'
    },

    // CHAPTER 15: NAT
    {
        id: 'nat',
        title: "Ch 15: NAT",
        description: "Network Address Translation: Private to Public IP.",
        icon: RefreshCw,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'NatScene'
    },

    // CHAPTER 16: ICMP
    {
        id: 'icmp',
        title: "Ch 16: ICMP & Ping",
        description: "Network Diagnostics: Ping & Traceroute.",
        icon: Activity,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'IcmpScene'
    },

    // CHAPTER 17: VLANs
    {
        id: 'vlans',
        title: "Ch 17: VLANs",
        description: "Virtual LANs: Network Segmentation & Security.",
        icon: Layers,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'VlanScene'
    },

    // CHAPTER 18: Wireless
    {
        id: 'wireless',
        title: "Ch 18: Wireless",
        description: "WiFi, 802.11 Standards & Security.",
        icon: Wifi,
        status: 'active',
        difficulty: 'Intermediate',
        sceneComponent: 'WirelessScene'
    },

    // CHAPTER 19: Cryptography
    {
        id: 'crypto',
        title: "Ch 19: Cryptography",
        description: "Encryption, Hashing & Data Security.",
        icon: Lock,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'CryptoScene'
    },

    // CHAPTER 20: Advanced Security
    {
        id: 'advanced-security',
        title: "Ch 20: Advanced Security",
        description: "Attacks, Defenses & Best Practices.",
        icon: AlertTriangle,
        status: 'active',
        difficulty: 'Advanced',
        sceneComponent: 'AdvancedSecurityScene'
    }
];
