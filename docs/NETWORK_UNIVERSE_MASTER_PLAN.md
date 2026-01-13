# The Network Universe: Master Plan

## 1. Core Philosophy
The core philosophy matches the "Anti-Gravity" directive. All concepts will be mapped to cosmic physics metaphors as defined:
- **Gravity-Free**: Data moves by energy and attraction.
- **Visual First**: No static diagrams. Everything flows.
- **Interactive**: The user controls time and variables.

## 2. Updated Project Architecture

```
src/
 ├─ engine/            # The Simulation Brain
 │   ├─ NetworkSimulator.js  # Main loop
 │   ├─ PhysicsEngine.js     # Attraction/Vector logic
 │   └─ algorithms/          # Specific Algo Implementations
 │       ├─ Routing.js       # Dijkstra, etc.
 │       ├─ Congestion.js    # Leaky Bucket, etc.
 │       └─ Security.js      # Encryption logic
 │
 ├─ core/              # Data Models
 │   ├─ Packet.js      # The energetic orb
 │   ├─ Node.js        # Base class for devices
 │   └─ EventBus.js    # Global messaging
 │
 ├─ layers/            # OSI Layer Components
 │   ├─ Application/   # Layer 7 Logic/UI
 │   ├─ Transport/     # Layer 4 Logic/UI
 │   ...
 │
 ├─ devices/           # Visual Hardware Components
 │   ├─ Router.jsx     # The magnetic decision station
 │   ├─ Switch.jsx     # The orbital distributor
 │   └─ Firewall.jsx   # The Force Field
 │
 ├─ protocols/         # Protocol Logic
 │   ├─ TCP.js         # Handshake state machine
 │   ├─ DNS.js         # Resolver logic
 │   └─ HTTP.js        # Request/Response builder
 │
 ├─ scenes/            # The Curriculum Modules (Topic-wise)
 │   ├─ IntroScene.jsx
 │   ├─ DevicesScene.jsx
 │   ├─ OsiScene.jsx
 │   ├─ TcpScene.jsx
 │   ...
 │
 ├─ animations/        # Reusable Framer Motion variants
 │   ├─ PacketMotion.js
 │   ├─ ConnectionPulse.js
 │   └─ DeviceHover.js
 │
 ├─ ui/                # HUD
 │   ├─ TelemetryPanel.jsx
 │   ├─ ControlPanel.jsx
 │   └─ Dashboard.jsx
 │
 ├─ state/             # Global Store (Zustand/Context)
 │   └─ useSimulationStore.js
 │
 ├─ data/              # Static Data
 │   └─ curriculum.js  # Topic list and metadata
 │
 └─ App.jsx
```

## 3. Curriculum Expansion
We have established the framework. Now we must populate the universe.

### Phase 1: Foundation (Done/In-Progress)
1. **The Universe Dashboard** (Done)
2. **OSI Model Deep Dive** (Done)
3. **Devices & Topologies** (Next Priority) - Visualizing Hub vs Switch vs Router physics.

### Phase 2: Core Protocols
4. **TCP/IP Handshake** - The Magnetic Bond.
5. **UDP Transmission** - The Kinetic Launch.
6. **DNS Resolution** - The Starmap Search (Recursive/Iterative).

### Phase 3: Traffic & Control
7. **Routing Algorithms** - Visualizing pathfinding (Dijkstra's glowing path).
8. **Congestion Control** - The Leaky Bucket (Visualized as energy flow) & Sliding Window.
9. **Switching** - MAC Learning (Populating a hologram table).

### Phase 4: Security & Real World
10. **Firewalls & NAT** - Force fields and Coordinate Translation.
11. **Encryption (TLS)** - The "Locking" animation.
12. **The Full Journey** - Typing "google.com" and seeing it all happen at once.

## 4. Next Step Implementation Plan
We will implement **"Network Devices"** next.
**Goal:** Visually demonstrate WHY a Switch is better than a Hub, and what a Router actually does.

**Scene Design:**
- **Hub:** Broadcasting energy (Messy, inefficient, collisions).
- **Switch:** Directed energy (Clean, orbital, efficient).
- **Router:** Inter-network travel (Gateway between two clusters).

Let's build the **Device Simulator**.
