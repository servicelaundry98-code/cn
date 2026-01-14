# 🌐 Network Universe - Interactive Computer Networks Learning Platform

> Master Computer Networks through the laws of Anti-Gravity Physics

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://cn-red.vercel.app/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-Physics-orange)](https://threejs.org/)

## 📚 Overview

**Network Universe** is an immersive, interactive educational platform that teaches computer networking concepts through stunning visualizations and physics-based simulations. Built with React, Three.js, and Framer Motion, it transforms abstract networking concepts into tangible, visual experiences.

## ✨ Features

- 🎨 **20 Interactive Modules** covering all major networking topics
- 🎯 **Real-time Simulations** with physics-based animations
- 📖 **Comprehensive Theory** aligned with industry-standard curriculum
- 🎮 **Interactive Controls** for hands-on learning
- 📊 **Live Telemetry** showing real-time network data
- 🌈 **Beautiful UI** with glassmorphism and modern design
- 📱 **Responsive Design** works on all devices

## 🗺️ Course Curriculum

### **Foundation (Chapters 1-3)**
1. **Introduction to Networks** - Network fundamentals, terminologies, and architecture
2. **OSI Model** - 7-layer protocol stack visualization
3. **TCP/IP Stack** - Practical 4-layer Internet architecture

### **Application Layer (Chapters 4-8)**
4. **DNS Resolution** - Domain Name System and hierarchical lookup
5. **HTTP/HTTPS** - Web protocols and secure communication
6. **DHCP** - Dynamic IP assignment (DORA process)
7. **Subnetting** - IP network division and CIDR
8. **IPv6** - Next-generation Internet Protocol

### **Transport Layer (Chapters 9-10)**
9. **TCP Handshake** - 3-way handshake and reliability
10. **TCP vs UDP** - Reliable vs fast protocol comparison

### **Network Layer (Chapter 11)**
11. **Routing Algorithms** - Dijkstra's algorithm and pathfinding

### **Link Layer (Chapters 12-13)**
12. **Network Devices** - Hubs, Switches, and Routers
13. **ARP Protocol** - IP to MAC address resolution

### **Security & Utilities (Chapters 14-16)**
14. **Network Security** - Firewalls, filtering, and threats
15. **NAT** - Network Address Translation
16. **ICMP & Ping** - Network diagnostics

### **Advanced Topics (Chapters 17-20)**
17. **VLANs** - Virtual LAN segmentation
18. **Wireless** - WiFi, 802.11 standards, and security
19. **Cryptography** - Encryption, hashing, and data security
20. **Advanced Security** - Attacks, defenses, and best practices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/servicelaundry98-code/cn.git
cd cn

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
network-viz/
├── src/
│   ├── scenes/           # 20 Interactive lesson modules
│   │   ├── IntroScene.jsx
│   │   ├── OsiVisualizerScene.jsx
│   │   ├── TcpIpScene.jsx
│   │   └── ... (17 more)
│   ├── ui/               # Reusable UI components
│   │   ├── LessonLayout.jsx
│   │   ├── ControlPanel.jsx
│   │   └── TelemetryPanel.jsx
│   ├── engine/           # Simulation engines
│   │   └── NetworkSimulator.js
│   ├── objects/          # 3D objects and visualizations
│   ├── data/             # Curriculum and device data
│   └── App.jsx           # Main application
├── public/               # Static assets
└── package.json
```

## 🎓 Module Details

### Chapter 1: Introduction to Networks

**Topics Covered:**
- Network fundamentals and evolution
- Basic terminologies (Node, Link, Protocol, IP Address)
- Network architecture types (Client-Server vs P2P)
- Goals of networks (Resource sharing, reliability, scalability)
- Real-world applications

**Interactive Features:**
- Chaos-to-order network formation animation
- 15-node LAN simulation
- Real-time connection visualization

### Chapter 2: OSI Model

**Topics Covered:**
- 7-layer protocol stack
- Encapsulation and de-encapsulation
- PDU (Protocol Data Unit) at each layer
- Layer-specific protocols

**Interactive Features:**
- Layer-by-layer packet journey
- Real-time encapsulation visualization
- Protocol inspector

### Chapter 9: TCP Handshake

**Topics Covered:**
- 3-way handshake (SYN, SYN-ACK, ACK)
- Connection establishment
- Sequence and acknowledgment numbers
- Connection termination (4-way handshake)

**Interactive Features:**
- Animated handshake sequence
- Packet flag visualization
- State machine diagram

### Chapter 12: Network Devices

**Topics Covered:**
- Hub (Layer 1) - Broadcast behavior
- Switch (Layer 2) - MAC address table
- Router (Layer 3) - IP routing

**Interactive Features:**
- Device comparison simulation
- Packet forwarding visualization
- Collision detection (Hub)

## 🎨 Design Philosophy

### Visual Excellence
- **Glassmorphism** - Modern frosted glass effects
- **Gradient Accents** - Vibrant color schemes
- **Smooth Animations** - Framer Motion powered transitions
- **Dark Mode** - Eye-friendly dark theme

### Educational Approach
- **Theory + Practice** - Balanced learning
- **Progressive Complexity** - Beginner to Advanced
- **Real-world Examples** - Practical applications
- **Interactive Feedback** - Immediate visual responses

## 🛠️ Technologies Used

### Core
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics and physics

### UI/UX
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **CSS3** - Custom styling with gradients

### Deployment
- **Vercel** - Hosting and CI/CD
- **Git** - Version control

## 📖 Learning Path

### For Beginners
1. Start with **Introduction to Networks** (Ch 1)
2. Understand **OSI Model** (Ch 2)
3. Learn **Network Devices** (Ch 12)
4. Explore **DNS** (Ch 4) and **HTTP** (Ch 5)

### For Intermediate Learners
1. Master **TCP Handshake** (Ch 9)
2. Understand **Routing** (Ch 11)
3. Learn **Subnetting** (Ch 7)
4. Explore **NAT** (Ch 15) and **ICMP** (Ch 16)

### For Advanced Students
1. Deep dive into **IPv6** (Ch 8)
2. Master **VLANs** (Ch 17)
3. Understand **Cryptography** (Ch 19)
4. Study **Advanced Security** (Ch 20)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing code structure
2. Use LessonLayout for new modules
3. Include comprehensive theory content
4. Add interactive visualizations
5. Test on multiple screen sizes

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **GeeksforGeeks** - Educational content reference
- **Cloudflare** - Networking documentation
- **Three.js Community** - 3D visualization inspiration

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for Computer Networks learners worldwide**

🌟 Star this repo if you find it helpful!
