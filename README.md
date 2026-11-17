# 🚀 FastekDot CollabChat — Real-Time Chat & Collaboration Workspace

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v4.8-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FastekDot CollabChat** is a high-performance, real-time team messaging and collaboration engine engineered with **Node.js, Express, and Socket.io**. Designed for low-latency communication, it enables distributed teams, developers, and client support channels to collaborate seamlessly inside isolated rooms with live presence indicators and typing feedback.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [System Architecture & Tech Stack](#-system-architecture--tech-stack)
3. [Project Folder Structure](#-project-folder-structure)
4. [Socket.io Event Documentation](#-socketio-event-documentation)
5. [REST API Endpoints](#-rest-api-endpoints)
6. [Local Installation & Setup](#-local-installation--setup)
7. [Security Best Practices](#-security-best-practices)
8. [Author & Branding](#-author--branding)

---

## 🌟 Key Features

* **Zero-Latency Bi-Directional Messaging:** Powered by WebSockets (`Socket.io`) for instant message delivery without page reloads.
* **Multi-Room Collaboration Architecture:** Users can join dedicated workspaces (`#Full-Stack-Dev`, `#UI-UX-Design`, `#Upwork-Clients`, `#General-Lobby`) with isolated message streams.
* **Live Online Presence Tracking:** Real-time sidebar updates whenever team members join or disconnect from an active room.
* **Smart Typing Indicators:** Debounced typing detection broadcasts *"User is typing..."* feedback to active room participants.
* **Automated System Notifications:** Built-in `FastekDot Bot` announces user joins, departures, and room welcome messages with exact timestamps.
* **Modern Responsive UI:** Crafted with a clean, dark-mode Tailwind CSS interface that adapts smoothly across desktop and mobile viewports.

---

## 🛠️ System Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime Environment** | Node.js | Asynchronous, event-driven JavaScript runtime |
| **Web Framework** | Express.js | Static asset serving & REST health/metadata endpoints |
| **Real-Time Engine** | Socket.io | WebSocket communication, room broadcasting & fallback handling |
| **Frontend UI** | HTML5, Tailwind CSS, Vanilla JS | Lightweight, dependency-free reactive DOM updates |
| **Development Environment** | Laragon / Node CLI | Local server execution and testing |

---

## 📂 Project Folder Structure

```text
fastekdot-realtime-chat/
├── public/
│   ├── index.html       # Responsive Join & Chat Workspace UI (Tailwind CSS)
│   └── client.js        # Client-side Socket.io listeners, DOM rendering & XSS sanitizer
├── server.js            # Express HTTP server, Socket.io room manager & API endpoints
├── package.json         # Project metadata, scripts & dependency manifest
├── .gitignore           # Git exclusion rules (node_modules, .env)
└── README.md            # Comprehensive technical documentation
