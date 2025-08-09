# PyConductor

**A virtual conductor that uses computer vision and gestures to orchestrate music**

PyConductor leverages opencv-python computer vision and gesture recognition to create an interactive experience where hand movements control musical elements in real-time. The backend is built with Flask and Flask-SocketIO, processing live video frames to detect gestures, while the frontend uses React for a smooth and responsive user interface.

Find the live site demo [here](https://py-conductor.vercel.app/conduct).

---

## Features

* Real-time gesture recognition via webcam input
* Interactive control of music through hand gestures
* Efficient video frame processing with OpenCV and MediaPipe
* WebSocket communication between backend and React frontend
* Cross-platform and lightweight

---

## Tech Stack

* **Backend**: Python, Flask, Flask-SocketIO, Eventlet, OpenCV, MediaPipe, NumPy
* **Frontend**: React
* **Communication**: WebSocket (Socket.IO)
* **Deployment**: Render and Vercel

---

## Getting Started

### Prerequisites

* Python 3.10+
* Node.js and npm (for frontend)
* Webcam for gesture input

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Luca1905/PyConductor.git
   cd pyconductor/backend
   ```

2. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:

   ```bash
   python wsgi.py
   ```

### Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

---

## Usage

* Open the React frontend in your browser (usually at `http://localhost:3000`)
* Allow webcam access when prompted
* Use hand gestures in front of your camera to control the music conductor interface
* See real-time visual feedback and orchestration changes based on your gestures

---

## Deployment

This app can be deployed on cloud platforms like Render with simple commands:

* Build command: `pip install -r requirements.txt`
* Start command: `python wsgi.py`
* Set environment variable `PORT` as needed

---

## Contributing

Co-creator: [@garghg](https://github.com/garghg)  
Contributions are welcome! Feel free to open issues or submit pull requests to improve features, add support, or fix bugs.

---
