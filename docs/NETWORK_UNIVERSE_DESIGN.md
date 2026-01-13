# Anti-Gravity Network Universe: Design Blueprint

## 1. Core Philosophy
The "Anti-Gravity Network Universe" is an educational platform that reimagines computer networking concepts through the lens of cosmic physics. It rejects dry, static diagrams in favor of dynamic, energy-based interactions.

### Metaphor Mapping Table
| Networking Concept | Anti-Gravity Metaphor | Visual Representation |
|-------------------|-----------------------|----------------------|
| **Data Packet** | Energy Orb | Glowing sphere with core payload & shell headers |
| **Client** | Satellite Node | Small floating orbital station |
| **Server** | Core Singularity | Massive, pulsing sun-like energy source |
| **Router** | Gravity Well / Gateway | Rotating magnetic ring structure |
| **Switch** | Orbital Hub | Metallic ring distributing energy |
| **Bandwidth** | Pipe Diameter / Flow | Thickness of the energy stream |
| **Latency** | Distance / Drag | Space dust or time-dilation field |
| **Packet Loss** | Energy Collapse | Orb fizzling out into particles |
| **TCP** | Magnetic Tether | Solid beam connecting sender/receiver |
| **UDP** | Kinetic Launch | Projectile motion without tether |
| **Firewall** | Force Field | Hexagonal energy shield |

---

## 2. Project Architecture (`src/`)

### `engine/` (The Brain)
Contains the simulation logic that runs independent of the UI.
- `NetworkSimulator.js`: Main state machine (Time, Phases, Events).
- `PhysicsEngine.js`: Handles collision, attraction, and movement vector math.

### `core/` (Data Models)
Classes representing the fundamental units of the universe.
- `Packet.js`: The data structure carrying headers, payload, and coordinates.
- `Node.js`: Base class for Client, Server, Router.

### `layers/` (OSI Components)
React components specific to inspecting or visualizing a specific OSI layer.
- `ApplicationLayer.jsx`
- `TransportLayer.jsx`
...

### `devices/` (Hardware Visualization)
3D-like or SVG components for network hardware.
- `RouterNode.jsx`: Improving on simple icons with animated parts.
- `SwitchNode.jsx`: distinct visual from Router.

### `protocols/` (Logic Modules)
- `TCPEngine.js`: Handshake logic, state tracking (SYN, ACK).
- `DNSLookup.js`: Recursive resolver logic.

### `scenes/` (The "Levels")
Each major curriculum topic is a distinct Scene.
- `OsiVisualizerScene.jsx`: (Implemented) The Deep Dive vertical stack.
- `TopologyScene.jsx`: For LAN/WAN visualization.
- `TcpHandshakeScene.jsx`: Focused interaction on the 3-way handshake.

### `animations/` (Motion Library)
Reusable Framer Motion variants and keyframes.
- `OrbitalMotion.js`: Floating "anti-gravity" drift.
- `PacketTransmission.js`: Path following logic.

### `ui/` (HUD & Controls)
- `TelemetryPanel.jsx`: (Implemented) Real-time packet inspection.
- `ControlPanel.jsx`: (Implemented) Playback controls.
- `TopicNavigator.jsx`: Main menu system.

### `state/` (Global Store)
Context or Zustand store for global app state (User progress, unlocked topics, settings).

---

## 3. Curriculum Roadmap (20 Topics)

1.  **Welcome to the Universe** - Basic metaphors.
2.  **The Network** - Nodes and Links.
3.  **LAN vs WAN** - Scale simulations.
4.  **Network Devices** - Router vs Switch vs Hub behaviors.
5.  **The OSI Model** (Current Focus) - 7 Layers Deep Dive.
6.  **TCP/IP Model** - The practical 4 layers.
7.  **Packets & Encapsulation** - The "Russian Doll" data structure.
8.  **Client-Server Architecture** - Request/Response cycle.
9.  **TCP vs UDP** - Reliability vs Speed (Tether vs Cannon).
10. **The Router** - Path selection logic.
11. **The Switch** - MAC Address tables.
12. **IP Addressing** - Coordinates in space.
13. **Subnetting** - Slicing the universe sectors.
14. **DNS** - The Star Map (Names to Coordinates).
15. **Bandwidth & Latency** - Physics of throughput.
16. **Congestion** - Traffic jams and queue management.
17. **Packet Loss & Reliability** - Error correction.
18. **NAT** - Private vs Public space.
19. **Firewalls** - Security shields.
20. **HTTPS/TLS** - Encryption tunnels (The Lock).

## 4. Educational Goal
To transform the user from a passive observer to an active architect of the universe, ensuring they can visualize the invisible flows of the internet.
