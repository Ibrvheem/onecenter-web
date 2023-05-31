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
import Test from "../components/Test";

const useStyles = makeStyles((theme) => {
  return {};
});
function Home() {
  return (
    <div>
      {/* <Test /> */}
      <Herosection />
      <Waitlist />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Home;
