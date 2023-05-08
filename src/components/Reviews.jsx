import { Card, Container, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";

const useStyles = makeStyles((theme) => {
  return {
    reviewsHeader: {
      margin: "10rem 0rem",
    },
    cards: {
      overflow: "hidden",
    },
    card: {
      border: ".1rem solid #4646f9",
      padding: "4rem 3rem",
      background: "transparent",
      width: "30%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginLeft: "3rem",
      outline: "none",
      gap: "3rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: "3rem",
      },
    },
  };
});
function Reviews() {
  const classes = useStyles();
  const flickityOptions = {
    pageDots: true,
    prevNextButtons: false,
    autoPlay: 3000,
    wrapAround: true,
    cellAlign: "left",
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://api.onecenter.itcentral.ng/reviews`, {
      method: "GET",
    }).then(async (response) => {
      let data = await response.json();
      setReviews(data);
    });
  }, []);
  return (
    <div>
      <Container className={classes.reviews}>
        <div className={classes.reviewsHeader}>
          <Typography variant="h4" className="waitlistH4">
            PEOPLE'S CUSTOMER CARE SERVICE EXPERIENCE
          </Typography>
          <Typography variant="body1" style={{ color: "white", opacity: 0.5 }}>
            Read all the experiences people have had with various companies all
            over the world.
          </Typography>
        </div>
      </Container>
      <Flickity
        className={classes.cards}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {reviews?.map((review) => (
          <Card className={classes.card} elevation={10}>
            <div className="comment">
              <Typography variant="body2">{review?.content}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="personName">
                <Typography variant="body2" style={{ opacity: 0.5 }}>
                  By: {review?.name}
                </Typography>
              </div>
              <div className="companyName">
                <Typography variant="body2" style={{ opacity: 0.5 }}>
                  For: {review?.company}
                </Typography>
              </div>
            </div>
          </Card>
        ))}
      </Flickity>
    </div>
  );
}

export default Reviews;
