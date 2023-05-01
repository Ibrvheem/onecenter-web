import {
  Button,
  Container,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    navbar: {
      height: "10rem",
      cursor: "pointer",
      // position: "fixed",
      width: "100%",
    },
    navbarContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navItem: {
      fontSize: "1.4rem",
      fontWeight: 700,
    },
  };
});
function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <Container className={classes.navbarContainer}>
        <div className={classes.logo}>
          <Typography
            variant="h4"
            className="heroH1"
            style={{ fontSize: "2rem" }}
          >
            OneCenter
          </Typography>
        </div>
        <div className={classes.navMenu}>
          <List>
            <ListItem className={classes.navItem} style={{ color: "white" }}>
              Demo
            </ListItem>
          </List>
        </div>
        <div className={classes.navBtn}>
          <Button className={[classes.navItem, "heroH1"]}>Wait List</Button>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
