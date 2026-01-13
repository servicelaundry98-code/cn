# Deep Dive: Modules 4 & 5

## 🤝 Module 4: TCP Handshake (Reliability)
**Objective**: Teach why TCP is "Reliable" and UDP is not.
**Core Metaphor**: "The Magnetic Bond".
**Code Location**: `src/scenes/TcpHandshakeScene.jsx`

### The Logic (Low Level Design)
The scene interacts as a linear **State Machine**:
1.  **State 0 (IDLE)**: No connection.
2.  **State 1 (SYN_SENT)**: Client shoots a **Yellow Orb** labeled `SYN`.
    *   *Log*: "Client Sequence = 100".
    *   *Theory*: "I want to talk."
3.  **State 2 (SYN_RCVD)**: Server catches it and shoots a **Green Orb** labeled `SYN-ACK`.
    *   *Log*: "Server Seq = 300, Ack = 101" (100 + 1).
    *   *Theory*: "I hear you (ACK), and I want to talk too (SYN)."
4.  **State 3 (ESTABLISHED)**: Client shoots a **Blue Orb** `ACK`.
    *   *Visually*: The tether between them turns **SOLID CYAN**.
    *   *Theory*: "Connection Locked. Data can flow."

### Educational Value
- Shows the difference between "Sending Data" vs "Establishing Permission to Send".
- Visualizes **Sequence Math** (x -> x+1), which is usually boring math in textbooks.

---

## 🗺️ Module 5: Routing (Pathfinding)
**Objective**: Teach how routers find the "Best" path, not just any path.
**Core Algorithm**: **Dijkstra's Shortest Path**.
**Code Location**: `src/scenes/RoutingScene.jsx`

### The Logic (Low Level Design)
The scene defines a **Weighted Graph**:
```javascript
A --(2ms)--> B --(4ms)--> D --(1ms)--> E
|                                      ^
+--(5ms)--> C --(1ms)--------+
```

1.  **Initialization**: All distances = Infinity, Start = 0.
2.  **Step 1 (Visit A)**:
    *   See neighbors B (2) and C (5).
    *   Mark B and C as tentative.
3.  **Step 2 (Visit B)**:
    *   Why B? Because 2 < 5. (Greedy Approach).
    *   From B, we see D (Cost 2+4 = 6) and C (Cost 2+2 = 4).
    *   **CRITICAL MOMENT**: We update C's cost from 5 to 4.
    *   *Log*: "Optimization Found! Path A->B->C is faster."
4.  **Step 3 (Visit C)**:
    *   From C (Cost 4), we see D (Cost 4+1 = 5).
    *   We update D's cost from 6 to 5.
5.  **Result**: The packet does NOT go in a straight line. It snakes through the fastest route.

### Educational Value
- Explains **Latency vs Hops**:
    - Direct Route A->C is 5ms.
    - Route A->B->C is 4ms.
    - Students learn that "More cables" can sometimes be "Faster" if the cables are better quality.
