import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "framer-motion";

const useStyles = makeStyles((theme) => {
  return {
    Herosection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "transparent",
      height: "90vh",
      gap: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "10rem",
        justifyContent: "space-around",
        height: "50vh",
        gap: "0",
      },
    },
    heroBtn: {
      borderRadius: 0,
      borderWidth: "3px",
      borderStyle: "solid",
      padding: "1rem 3rem",
      marginTop: "5rem",
      color: "white",
      borderImage: "linear-gradient(to right, #812DE2, #3A49F9) 1",
      [theme.breakpoints.down("sm")]: {
        marginTop: "0rem",
      },
    },
  };
});
function Herosection() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const classes = useStyles();

  useEffect(() => {
    if (isInView) {
      console.log("hello");
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [isInView, controls]);
  // const MIN_DECIBELS = -45;

  // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //   const mediaRecorder = new MediaRecorder(stream);
  //   mediaRecorder.start();

  //   const audioChunks = [];
  //   mediaRecorder.addEventListener("dataavailable", (event) => {
  //     audioChunks.push(event.data);
  //   });

  //   const audioContext = new AudioContext();
  //   const audioStreamSource = audioContext.createMediaStreamSource(stream);
  //   const analyser = audioContext.createAnalyser();
  //   analyser.minDecibels = MIN_DECIBELS;
  //   audioStreamSource.connect(analyser);

  //   const bufferLength = analyser.frequencyBinCount;
  //   const domainData = new Uint8Array(bufferLength);

  //   let soundDetected = false;

  //   const detectSound = () => {
  //     if (soundDetected) {
  //       console.log("sound detected");
  //     } else {
  //       console.log("sound not detected");
  //     }

  //     analyser.getByteFrequencyData(domainData);

  //     for (let i = 0; i < bufferLength; i++) {
  //       const value = domainData[i];

  //       if (domainData[i] > 0) {
  //         soundDetected = true;
  //       }
  //     }

  //     window.requestAnimationFrame(detectSound);
  //   };

  //   window.requestAnimationFrame(detectSound);

  //   mediaRecorder.addEventListener("stop", () => {
  //     const audioBlob = new Blob(audioChunks);
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioUrl);
  //     audio.play();

  //     console.log({ soundDetected });
  //   });
  // });
  return (
    <div>
      <Container className={classes.Herosection}>
        <Typography variant="h1" className="heroH1">
          OneCenter
        </Typography>
        <Typography variant="h2">
          The Future Of Customer Service Is Here
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit non
          tenetur suscipit, dolorum dolore dolores officia, vitae vero maiores
          et voluptas voluptates quis laboriosam. Nulla suscipit, repellendus
          rerum excepturi, modi ad necessitatibus repellat illo nemo provident,
          rem fugit consectetur.
        </Typography>
        <div className="userInput">
          <a href="#waitList">
            <button type="button" class="button" id="button">
              <span class="button__text">JOIN THE WAITLIST</span>
              <span class="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  class="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Herosection;
