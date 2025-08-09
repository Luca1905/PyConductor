import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# Start capturing video from webcam
cap = cv2.VideoCapture(0)

images = []

# STEP 2: Create an GestureRecognizer object.
base_options = python.BaseOptions(model_asset_path='gesture_recognizer.task')
options = vision.GestureRecognizerOptions(base_options=base_options)
recognizer = vision.GestureRecognizer.create_from_options(options)

while True:
    # Read video frame by frame
    _,frame = cap.read()
    
    #Flip image 
    frame=cv2.flip(frame,1)
    
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
        print(gesture, hand)

    # Display Video and when 'q' is entered,
    # destroy the window
    cv2.imshow('Image', frame)
    if cv2.waitKey(1) & 0xff == ord('q'):
        break