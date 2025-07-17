# 🌭 SeeFood - Hotdog / Not Hotdog Classifier

This is a fun deep learning project inspired by the *SeeFood* app from the TV show **Silicon Valley**. The app classifies whether an image contains a **hotdog** or **not hotdog** using a fine-tuned **MobileNetV2** model served via Flask.

## 🧠 How It Works

- This app uses **transfer learning** with **MobileNetV2**:
  - The base model is MobileNetV2 (pre-trained on ImageNet).
  - Only the **top classification layer** (head) is trained on a custom hotdog / not-hotdog dataset.
- The trained model is saved and served using a **Flask** backend.
- The **React** frontend allows users to upload an image.
- Based on the prediction, a fun video (from *Silicon Valley*) is played showing "Hotdog" or "Not Hotdog".

## 🚀 Features

- 🔍 Transfer learning with MobileNetV2
- 🎬 Plays a video based on prediction
- 🧪 Real-time image classification
- 🔥 Fast & lightweight backend (Flask)
- 💻 Sleek frontend using React + Bootstrap

## 🛠️ Tech Stack

- **Model:** MobileNetV2 (with custom classification head)
- **Backend:** Flask, TensorFlow
- **Frontend:** React, Bootstrap, Vite
- **Tools:** Python, TensorFlow, NumPy, Keras

