import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from flask_socketio import emit

images = []

def detectGesture(frame):

    # Create an GestureRecognizer object.
    base_options = python.BaseOptions(model_asset_path='gesture_recognizer.task')
    options = vision.GestureRecognizerOptions(base_options=base_options)
    recognizer = vision.GestureRecognizer.create_from_options(options)
    
    # Convert BGR image to RGB image
    frameRGB = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)

    # Convert the frame received from OpenCV to a MediaPipe’s Image object.
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frameRGB)

    # Send live image data to perform gesture recognition.
    recognition_result = recognizer.recognize(mp_image)

    images.append(mp_image)
    if (len(recognition_result.gestures) > 0):
        gesture = recognition_result.gestures[0][0].category_name
        hand = recognition_result.handedness[0][0].category_name
        if hand == "Right":
            hand = "Left"
        else:
            hand = "Right"
        emit(f'{hand}:{gesture}')