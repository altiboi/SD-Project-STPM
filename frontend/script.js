const video = document.getElementById('video');

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/frontend/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/frontend/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/frontend/models"),

  ]).then(startWebCam).then(getLabeledFaceDescriptions);

function startWebCam(){
    navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio:false 
        })
        .then(stream => {
            video.srcObject = stream;
            })
        .catch(err => console.error(err));
};
function getLabeledFaceDescriptions() {
    const labels = ["Nkosinathi","Kat","Sims"];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/frontend/labels/${label}/${i}.jpeg`);
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
  video.addEventListener("play", async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
  
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
  
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.8 }))
        .withFaceLandmarks()
        .withFaceDescriptors();
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  
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
  });
  