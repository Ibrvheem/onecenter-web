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

const useStyles = makeStyles((theme) => {
  return {
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <Container
        classes={classes.waitList}
        id="waitList"
        data-aos="fade-zoom-up"
        data-aos-easing="ease-in-back"
        data-aos-delay="500"
        data-aos-offset="0"
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

          <Button
            variant="outlined"
            className={classes.button}
            startIcon
            onClick={props.handleClick}
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
