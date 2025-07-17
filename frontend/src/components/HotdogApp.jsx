import React, { useState } from 'react';
import axios from 'axios';

const HotdogApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResult(null);
    setVideoSrc(null);
    setShowToast(false);
  };

  const playSound = (type) => {
    const audio = new Audio(type === 'hotdog' ? '/sizzle.mp3' : '/buzzer.mp3');
    audio.play();
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setVideoSrc('/gilfoid.mp4');
      setResult("Please upload an image.");
      triggerToast("Please upload an image 🍔");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    setResult(null);
    setVideoSrc(null);
    setShowToast(false);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      const prediction = response.data.result.trim().toLowerCase();
      setResult(response.data.result);

      if (prediction === 'hotdog') {
        setVideoSrc('/hotdog.mp4');
        playSound('hotdog');
        triggerToast("🌭 It's a HOTDOG!");
      } else {
        setVideoSrc('/nothotdog.mp4');
        playSound('nothotdog');
        triggerToast("🚫 Not a hotdog!");
      }
    } catch (error) {
      console.error('Upload error:', error);
      setResult("Error uploading image.");
      triggerToast("⚠️ Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #FFDEE9, #B5FFFC)',
        fontFamily: "'Fredoka', 'Comic Sans MS', cursive",
        padding: '3rem 1rem',
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 text-center" style={{ borderRadius: '20px' }}>
            <h1 className="fw-bold text-danger display-5 mb-2">🌭 Hotdog or Not Hotdog?</h1>
            <p className="text-muted mb-4">Upload an image and let AI judge your lunch! 🍟</p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mb-3"
            />

            <button
              onClick={handleUpload}
              className="btn btn-warning w-100 fw-bold mb-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Judging your food...
                </>
              ) : (
                'Analyze Image 🍔'
              )}
            </button>

            {result && (
              <div className="alert alert-info mt-3" role="alert">
                🍽️ Result: <strong>{result}</strong>
              </div>
            )}

            {videoSrc && (
              <div className="mt-3">
                <video
                  src={videoSrc}
                  className="img-fluid rounded shadow"
                  autoPlay
                  loop
                  controls
                />
              </div>
            )}

            {(result || videoSrc) && (
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setResult(null);
                  setVideoSrc(null);
                }}
                className="btn btn-outline-dark mt-4 w-100"
              >
                🔁 Try Another
              </button>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div
          className="toast show position-fixed top-0 start-50 translate-middle-x mt-3 bg-light border shadow"
          style={{ zIndex: 9999, transition: 'all 0.5s ease' }}
        >
          <div className="toast-body text-center">
            <strong>{toastMessage}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotdogApp;
