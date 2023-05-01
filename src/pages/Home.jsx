import React, { useEffect, useRef, useState } from "react";
import Herosection from "../components/Herosection";
import Waitlist from "../components/Waitlist";
import Reviews from "../components/Reviews";
import { Typography, makeStyles } from "@material-ui/core";
import WaveSurfer from "wavesurfer.js";
import Footer from "../components/Footer";
import Aos from "aos";
import { AudioRecorder } from "react-audio-voice-recorder";
import { ReactMic } from "react-mic";

const useStyles = makeStyles((theme) => {
  return {};
});
function Home() {
  const classes = useStyles();
  const [audioUrl, setAudioUrl] = useState(null);
  const [callComponent, setCallComponent] = useState(false);
  function handleCall() {
    setCallComponent(true);
  }
  // const postData = (audioUrl) => {
  //   setCallComponent(false);

  //   const formData = new FormData();
  //   formData.append(
  //     "audio",
  //     audioUrl
  //     // new File([audioBlob], "recording.wav", { type: "audio/wav" })
  //   );

  //   fetch("/api/recordings", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div>
      <Herosection />

      {audioUrl && (
        <div>
          <audio src={audioUrl} controls />
        </div>
      )}
      <Waitlist handleClick={handleCall} />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Home;
