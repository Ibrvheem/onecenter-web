import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      marginTop: "10rem",
      borderTop: ".1rem solid rgba(255,255,255,.1)",
      padding: "5rem 0rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: 600,
      //   opacity: 0.5,
      color: "white",
      cursor: "pointer",
    },
    listItem: {
      fontSize: "1.5rem",
      opacity: 0.5,
      color: "white",
      cursor: "pointer",
    },
  };
});
function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.logo}>
          <Typography
            variant="h4"
            className="heroH1"
            style={{ fontSize: "3rem", textAlign: "left" }}
          >
            OneCenter
          </Typography>
        </div>
        <Grid container>
          <Grid item md={3} xs={6} sm={6}>
            <List>
              <ListItem className={classes.title}>Support</ListItem>
              <ListItem className={classes.listItem}>Documentation</ListItem>
              <ListItem className={classes.listItem}>Pricing Plan</ListItem>
              <ListItem className={classes.listItem}>Tutorial</ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6} sm={6}>
            <List>
              <ListItem className={classes.title}>Company</ListItem>
              <ListItem className={classes.listItem}>About</ListItem>
              <ListItem className={classes.listItem}>Blog</ListItem>
              <ListItem className={classes.listItem}>Join us</ListItem>
              <ListItem className={classes.listItem}>Partners</ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6} sm={6}>
            <List>
              <ListItem className={classes.title}>Legal</ListItem>
              <ListItem className={classes.listItem}>Claim</ListItem>
              <ListItem className={classes.listItem}>Privacy</ListItem>
              <ListItem className={classes.listItem}>Terms</ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={6} sm={6}>
            <List>
              <ListItem className={classes.title}>Powered by:</ListItem>
              <ListItem className={classes.listItem}>iT Central</ListItem>
              <ListItem className={classes.listItem}>Radisys</ListItem>
              <ListItem className={classes.listItem}>OpenAi</ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
