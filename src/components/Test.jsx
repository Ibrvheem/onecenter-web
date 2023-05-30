import React, { useRef, useState } from "react";
import { ReactMic } from "react-mic";

const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    const MIN_DECIBELS = -45;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = MIN_DECIBELS;
      audioStreamSource.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      let silenceDetected = false;
      let silenceTimer = null;

      const detectSound = () => {
        analyser.getByteFrequencyData(domainData);

        const soundDetected = Array.from(domainData).some((value) => value > 0);

        if (soundDetected) {
          clearTimeout(silenceTimer);
          silenceDetected = false;
          console.log("sound detected");
        } else if (!silenceDetected) {
          silenceDetected = true;
          silenceTimer = setTimeout(() => {
            console.log("Silence detected for more than 2 seconds");
          }, 2000);
        }

        window.requestAnimationFrame(detectSound);
      };

      window.requestAnimationFrame(detectSound);

      mediaRecorder.addEventListener("stop", () => {
        clearTimeout(silenceTimer);
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      });
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    audioRef.current.src = audioUrl;
  };
  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <audio src="../../Audio/ringer.mp3" controls />
    </div>
  );
};

export default Test;
