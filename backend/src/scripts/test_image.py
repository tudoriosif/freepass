import numpy as np
import cv2
import os
import sys
import json
import re

import face_recognition as fr

img_path = sys.argv[1]

test_img = cv2.imread(img_path)

name_txt = img_path.split("/")[3].split('@')[0]  # Get name from user email
model_path = re.findall(".(?<=.).*(?<=/)", img_path)[0] + name_txt + ".yml"  # Get path for model

faces_detected, gray_img = fr.faceDetection(test_img)

face_recognizer = cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read(model_path)

name = {0: name_txt}

dictionary = {
    "name": name_txt
}

if not faces_detected.size:
    raise Exception('No faces detected')

for face in faces_detected:
    (x, y, w, h) = face
    roi_gray = gray_img[y:y + h, x:x + h]
    label, confidence = face_recognizer.predict(roi_gray)
    dictionary["label"] = label
    dictionary["distance"] = confidence
    json_dumps = json.dumps(dictionary)
    fr.draw_rect(test_img, face)
    predicted_name = name[label]
    fr.put_text(test_img, predicted_name, x, y)

print(json_dumps)
