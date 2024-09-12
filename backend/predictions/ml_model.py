import os
import numpy as np
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
scaler_path = os.path.join(BASE_DIR, 'scaler.pkl')
classifier_path = os.path.join(BASE_DIR, 'classifier.pkl')

scaler = joblib.load(scaler_path)
classifier = joblib.load(classifier_path)

def predict(input_features):
    input_features = np.array(input_features).reshape(1, -1)  
    scaled_features = scaler.transform(input_features)  
    prediction = classifier.predict(scaled_features)  
    return prediction[0]  
