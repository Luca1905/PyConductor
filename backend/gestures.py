import cv2
import mediapipe as mp

Draw = mp.solutions.drawing_utils

# Start capturing video from webcam
cap = cv2.VideoCapture(0)

while True:
    # Read video frame by frame
    _,frame = cap.read()
    
    #Flip image 
    frame=cv2.flip(frame,1)
    
    # Convert BGR image to RGB image
    frameRGB = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)

    # Display Video and when 'q' is entered,
    # destroy the window
    cv2.imshow('Image', frame)
    if cv2.waitKey(1) & 0xff == ord('q'):
        break