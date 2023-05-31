import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";

const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (audioUrl && shouldPlay) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl, shouldPlay]);

  const startRecording = () => {
    setIsRecording(true);
    const MIN_DECIBELS = -45;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder); // Save the media recorder in state

      recorder.start();

      const chunks = [];
      recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      setAudioChunks(chunks); // Save the audio chunks in state

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

      recorder.addEventListener("stop", () => {
        clearTimeout(silenceTimer);
        const audioBlob = new Blob(audioChunks);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url); // Set the audio URL

        setTimeout(() => {
          setShouldPlay(true); // Start playing the audio after a slight delay
        }, 100);
      });
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShouldPlay(false); // Stop playing the audio
    if (mediaRecorder) {
      mediaRecorder.stop();
      const audioBlob = new Blob(audioChunks);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url); // Set the audio URL
    }
  };

  const onData = (recordedBlob) => {
    // Handle the recorded audio data
    console.log("Recorded Blob:", recordedBlob);
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
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
};

export default Test;
