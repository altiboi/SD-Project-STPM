import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceAuth.css'

function FaceRecognition() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        console.log('Models loaded successfully');

        startWebcam();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    }

    loadModels();
  }, []);

  async function startWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadedmetadata', startFaceRecognition);
        console.log('Webcam started successfully');
      }
    } catch (error) {
      console.error('Error starting webcam:', error);
    }
  }

  async function getLabeledFaceDescriptions() {
    const labels = ["Nkosinathi","Kat","Sims"];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/labels/${label}/${i}.jpeg`);
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  async function startFaceRecognition() {
    try {
      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const video = videoRef.current;

      const canvas = faceapi.createCanvasFromMedia(video);
      canvas.classList.add('appCanvas'); // Add the class to center the canvas
      document.body.append(canvas);

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.8 }))
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result,
          });
          drawBox.draw(canvas);
        });
      }, 100);
    } catch (error) {
      console.error('Error starting face recognition:', error);
    }
  }

  return (
    <div className="auth">
      <h1>Face Recognition</h1>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
}

export default FaceRecognition;
