from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

# Load model once
model = tf.keras.models.load_model('model/hotdog_model.keras')
class_names = ['HOTDOG', 'NOT HOTDOG']


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400

    file = request.files['image']
    image = Image.open(file).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    img_tensor = np.expand_dims(img_array, axis=0)  # [1, 224, 224, 3]

    prediction = model.predict(img_tensor)
    label = class_names[np.argmax(prediction)]

    return jsonify({'result': label})


if __name__ == '__main__':
    app.run(debug=True)
