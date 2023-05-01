import React, { useEffect, useState } from "react";
import Herosection from "../components/Herosection";
import Waitlist from "../components/Waitlist";
import Reviews from "../components/Reviews";
import { Typography, makeStyles } from "@material-ui/core";
import WaveSurfer from "wavesurfer.js";
import Footer from "../components/Footer";
import Aos from "aos";

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
  };
});
function Home() {
  const classes = useStyles();
  const [callComponent, setCallComponent] = useState(false);
  function handleCall() {
    setCallComponent(true);
  }

  return (
    <div>
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
      <Herosection />
      <Waitlist handleClick={handleCall} />
      <Reviews />
      <Footer />
    </div>
  );
}

export default Home;
