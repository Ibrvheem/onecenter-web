import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";

import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";

const useStyles = makeStyles((theme) => {
  return {
    callContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    callDisappear: {
      position: "fixed",
      zIndex: 5,
      top: "-100rem",
      width: "0rem",
      height: "80px",
      borderRadius: "10rem",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0rem 3rem",
      transition: "all ease-in-out 1.2s",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        height: "80px",
      },
    },
    callAppear: {
      position: "fixed",
      zIndex: 5,
      top: "5rem",
      margin: "0 auto",
      width: "50rem",
      height: "80px",
      borderRadius: "10rem",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0rem 3rem",
      transition: "all ease-in-out 1.2s",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        height: "80px",
      },
    },
    callInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    oneCenterCallStatus: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      // gap: "1rem",
    },
    callDot: {
      height: "1rem",
      width: "1rem",
      borderRadius: "50%",
      backgroundColor: "orange",
      animationName: "my-animation",
      animationDuration: "1s",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    },

    callConnectDisconnect: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255, .1)",
    },
    callConnectDisconnectAppear: {
      height: "5rem",
      width: "5rem",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255, .1)",
    },
    form: {
      marginTop: "10rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "3rem",
      },
    },
    textInput: {
      width: "50rem",
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 0.4,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 0.8,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.secondary.light,
          opacity: 1,
        },
      },
    },
    icon: {
      width: "2rem",
    },
    button: {
      width: "50rem",
      padding: "18.5px 14px",
      fontSize: "1.6rem",
      display: "flex",
      justifyContent: "space-around",
      transition: "all ease-in-out .5s",
      color: theme.palette.primary.main,
      borderColor: theme.palette.secondary.light,
      [theme.breakpoints.down("sm")]: {
        width: "35rem",
        padding: "14px",
      },
    },
  };
});
function Waitlist(props) {
  Aos.init();
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [callComponent, setCallComponent] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [reviewId, setReviewId] = useState("");
  const [record, setRecord] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  function handleJoinWaitList() {
    let ringer = new Audio("./Audio/ringer.mp3");
    ringer.loop = true;
    ringer.play();
    setCallComponent(true);
    fetch("https://api.onecenter.itcentral.ng/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, company: companyName }),
    })
      .then((response) => {
        ringer.pause();
        ringer.currentTime = 0;
        // Check if the response status is OK (200-299)
        if (response.ok) {
          const headers = new Headers(response.headers);
          const id = headers.get("Review-Id");
          console.log(id);
          response.arrayBuffer().then((buffer) => {
            // Decode the byte array using the Web Audio API
            context.decodeAudioData(buffer, (decodedData) => {
              // Create a new buffer source and set the decoded data as its buffer
              const source = context.createBufferSource();
              source.buffer = decodedData;
              // Connect the buffer source to the destination (speakers)
              source.connect(context.destination);
              // Start playing the audio
              source.start();
              source.addEventListener("ended", () => {
                startRecording();
                setTimeout(() => {
                  stopRecording();

                  const formData = new FormData();

                  formData.append("speech", recordedAudio);
                  console.log(id);

                  fetch(`https://api.onecenter.itcentral.ng/review/${id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    body: formData,
                  }).then((res) => {
                    res.json().then((data) => {
                      if (data.status == "success") {
                        console.log(data.message);
                      }
                    });
                  });
                }, 10000);
              });
            });
          });
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Create a new AudioContext
    const context = new AudioContext();
  }
  const startRecording = () => {
    setRecord(true);
    setRecordedAudio(null);
  };

  const stopRecording = () => {
    setRecord(false);
  };
  const onStop = (recordedBlob) => {
    const recordedFile = new File([recordedBlob.blob], "recorded_audio.wav", {
      type: recordedBlob.blob.type,
      lastModified: Date.now(),
    });
    setRecordedAudio(recordedFile);
    console.log(recordedFile);
  };

  return (
    <div>
      <div>
        <ReactMic record={record} className="sound-wave" onStop={onStop} />
        <div className={classes.recorder}>
          {/* <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            onClick={startRecording}
          >
            Start Recording
          </Button>
          <Button
            variant="contained"
            className={classes.btn}
            color="secondary"
            onClick={stopRecording}
          >
            Stop Recording
          </Button> */}
          {/* {recordedAudio && (
            <audio controls>
              <source src={URL.createObjectURL(recordedAudio)} />
            </audio>
          )}{" "} */}
        </div>
      </div>
      <div className={classes.callContainer}>
        <div
          className={callComponent ? classes.callAppear : classes.callDisappear}
        >
          <div className={classes.callInfo}>
            <div className={classes.callDot}></div>
            <div className={classes.timer}>
              <Typography
                variant="body2"
                style={{ opacity: 0.5, fontWeight: 600 }}
              >
                0:59
              </Typography>
            </div>
          </div>
          <div className={classes.oneCenterCallStatus}>
            <Typography variant="body1">OneCenter</Typography>
            <Typography
              variant="body2"
              style={{ opacity: 1, color: "green", fontWeight: 600 }}
            >
              Connected
            </Typography>
            {/* <audio src={} autoPlay /> */}
          </div>
          <div
            className={classes.callConnectDisconnect}
            onClick={() => {
              setCallComponent(false);
            }}
          >
            <img src="./Icons/telephone.png" alt="" width="30rem" />
          </div>
        </div>
      </div>
      <Container
        classes={classes.waitList}
        id="waitList"
        // data-aos="fade-zoom-up"
        // data-aos-easing="ease-in-back"
        // data-aos-delay="500"
        // data-aos-offset="0"
      >
        <Typography variant="h4" className="waitlistH4">
          Join the OneCenter waitlist now for exclusive access to our beta
          release.
        </Typography>
        <Typography variant="body1" style={{ color: "white", opacity: 0.5 }}>
          Be among the first to experience our revolutionary new platform and
          transform the way you manage your business{" "}
        </Typography>
        <form
          className={classes.form}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
          data-aos-offset="0"
        >
          <TextField
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/person.png" className={classes.icon} />
                Name
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/mail.png" className={classes.icon} />
                Mail
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            inputProps={{
              style: { color: "white" },
            }}
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: isFocused ? 1 : 0.2,
                  transition: "all ease-in-out .5s",
                }}
              >
                <img src="./Icons/mail.png" className={classes.icon} />
                Company to Review
              </span>
            }
            className={classes.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Button
            variant="outlined"
            className={classes.button}
            startIcon
            onClick={handleJoinWaitList}
            disabled={email || name != "" ? false : true}
            // disabled
            endIcon={<img src="./Icons/hourglass.png" width="25rem" />}
          >
            JOIN THE WAITLIST
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Waitlist;
