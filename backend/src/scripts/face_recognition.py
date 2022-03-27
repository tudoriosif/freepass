import cv2
import os
import numpy as np


def faceDetection(input_img):
    gray_image = cv2.cvtColor(input_img, cv2.COLOR_BGR2GRAY)
    face_haar = cv2.CascadeClassifier('./src/scripts/haarcascade_frontalface_default.xml')
    faces = face_haar.detectMultiScale(gray_image, scaleFactor=1.2, minNeighbors=3)
    return faces, gray_image


def train_classifier(faces, faceID):
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.train(faces, np.array(faceID))
    return face_recognizer


def draw_rect(test_img, face):
    (x, y, w, h) = face
    cv2.rectangle(test_img, (x, y), (x + w, y + h), (0, 255, 0))


def put_text(test_img, text, x, y):
    cv2.putText(test_img, text, (x, y), cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 2)


def labels_for_training_data(directory):
    faces = []
    faceID = []

    for path, subdirnames, filenames in os.walk(directory):
        for filename in filenames:
            if filename.startswith("."):
                print("skipping system file")
                continue
            id = 0
            img_path = path + '/' + filename
            test_img = cv2.imread(img_path)
            if test_img is None:
                print("Not Loaded Properly")
                continue
            faces_rect, gray_img = faceDetection(test_img)
            if len(faces_rect) != 1:
                continue
            (x, y, w, h) = faces_rect[0]
            roi_gray = gray_img[y:y + w, x:x + h]
            faces.append(roi_gray)
            faceID.append(int(id))
    return faces, faceID
