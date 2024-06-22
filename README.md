# React WebRTC Multi-Peer Connection with Multi Webcam and Multi Screen Share

Here is a cool demonstration of the feature:

[![Watch the video](https://img.youtube.com/vi/xUCPFq0HKDI/maxresdefault.jpg)](https://www.youtube.com/watch?v=xUCPFq0HKDI)

## Overview

This project is a React application built with TypeScript that utilizes WebRTC technology for establishing multi-peer connections. It includes features for multi-webcam streaming and multi-screen sharing using WebRTC for real-time communication.

### Key Features

- **Multi-Peer Connection**: Establish direct peer-to-peer connections between multiple clients.
- **Multi-Webcam Support**: Stream video from multiple webcams simultaneously.
- **Multi-Screen Share**: Share screens from multiple clients in real-time.
- **RTC-Datachannel**: Employs RTC DataChannel for messaging and other real-time signaling communications, such as session leave or end session for everyone.
- **Signaling**: Socket.IO is used for sending offers and answers in this project. Other signaling methods, such as WebSocket, REST APIs, or SIP (Session Initiation Protocol), can also be employed.

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)
- Git

### Clone the Repository

```bash
git clone https://github.com/justpingme/React-WebRTC-MultiCamScreenShare.git
cd React-WebRTC-MultiCamScreenShare
```

#### Navigate to client directory and Install client-side dependencies
```bash
cd client
npm install 
```

Open New temrinal
#### Navigate to server directory and Install server-side dependencies
```bash
cd server
npm install
```

Getting Started

Starting the Server
#### From the server directory
```bash
npm run dev
```

Starting the Client
#### From the client directory
```bash
npm start
```


Feel free to customize this template further based on your specific project details, branding, or additional features you may want to highlight. Adjust the folder structure section to accurately reflect your project's organization.


Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests to propose improvements or additional features.

License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements

- **WebRTC**: Real-time communication protocol for peer-to-peer applications.
- **React**: JavaScript library for building user interfaces.
- **Socket.IO**: Real-time bidirectional event-based communication library.



