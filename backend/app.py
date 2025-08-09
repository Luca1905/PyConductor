import base64
from flask import Flask
from flask_socketio import SocketIO, emit
from collections import deque
import numpy as np
import cv2
from gestures import detectGesture

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Store only the last 10 frames
frame_buffer = deque(maxlen=10)

@socketio.on('frame:update')
def handle_blob(data):
    # Add frame to buffer (stored in memory, not saved to disk)
    frame_buffer.append(data)
    # convert the frame data to image and send to opencv
    process_latest_frame()

def process_latest_frame():
    if frame_buffer:
        frame_data = frame_buffer[-1]  # Most recent frame

        # If it's a data URL, strip the header
        if isinstance(frame_data, str) and frame_data.startswith("data:image"):
            frame_data = frame_data.split(",")[1]

        # Decode Base64 string to bytes
        if isinstance(frame_data, str):
            frame_data = base64.b64decode(frame_data)

        # Now frame_data is raw bytes
        np_arr = np.frombuffer(frame_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is not None:
            detectGesture(img, lambda gesture: emit(gesture))
        else:
            print("Error decoding frame")

if __name__ == '__main__':
    socketio.run(app, debug=True)
