import numpy as np
import sys
import cv2
import os
import json

import face_recognition as fr

folder_path = sys.argv[1]
folder_split = folder_path.split("/")
name_txt = folder_split[3].split("@")[0]
model_path = "/".join(folder_split[0:4]) + "/check/" + name_txt + ".yml"

faces, faceID = fr.labels_for_training_data(folder_path)
face_recognizer = fr.train_classifier(faces, faceID)
face_recognizer.save(model_path)

dictionary = {
    "model_path": model_path
}

print('Model saved')
