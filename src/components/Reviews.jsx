import { Card, Container, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const useStyles = makeStyles((theme) => {
  return {
    reviewsHeader: {
      margin: "10rem 0rem",
    },
    cards: {
      // overflow: "hidden",
    },
    card: {
      border: ".1rem solid #4646f9",
      padding: "4rem 3rem",
      margin: "5rem 0rem",

      background: "transparent",
      // width: "30%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginLeft: "3rem",
      outline: "none",
      gap: "3rem",
      transition: "all ease-in-out .5s",
      "&:hover": {
        scale: "1.05",
        border: ".25rem solid #4646f9",
        transition: "all ease-in-out .5s",
      },
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
    },
  };
});
function Reviews() {
  const classes = useStyles();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
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

      <Splide
        aria-label="My Favorite Images"
        options={{
          type: "loop",
          rewind: true,
          autoplay: true,
          perMove: 1,
          perPage: window.innerWidth < 960 ? 1 : 4,
          arrows: false,
          width: "100%",
          pagination: false,
          autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: false,
            speed: 2,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {reviews?.map((review) => (
          <SplideSlide style={{ width: "20%" }}>
            <Card className={classes.card} elevation={20}>
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
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Reviews;
