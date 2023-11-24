import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Box, Typography, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlaceHolderImage from "../../images/PlaceHolderImage.png";

const slideData = [
  {
    title: "Interactive Dashboard",
    content:
      "Stay informed and motivated with our interactive dashboard. Visualize your team's progress in real time, making it easier to track milestones and celebrate achievements",
  },
  {
    title: "Intuitive Task Assignment System",
    content:
      "UniTask elevates task management through its drag-and-drop functionality, allowing users to easily assign and organize tasks. This feature not only enhances visualization but also simplifies task creation. Moreover, UniTask empowers users to deconstruct and manage subtasks effectively, fostering collaborative and efficient team dynamics.",
  },
  {
    title: "Effortless Meeting Scheduling",
    content:
      "Scheduling meetings is a breeze with UniTask. Our system mirrors the functionality of When2Meet, enabling users to select their availability and letting our algorithm propose optimal meeting times. This hassle-free approach ensures that finding the perfect time for team meetings is effortless and efficient.",
  },
  {
    title: "Reflective Review Page",
    content:
      "UniTask encourages continuous growth and reflection. Our review page allows users to submit weekly reflections on their progress, promoting self-awareness and team improvement.",
  },
  {
    title: "Explore More",
    content:
      "UniTask is packed with additional features waiting to be explored. Each component is designed to enhance your project management experience, making it not just effective but enjoyable.",
  },
];

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        border: 0,
        padding: 0,
        background: "transparent",
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translate(0, -50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <ArrowBackIosNewIcon style={{ color: "#E9ECEF" }} />
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        zIndex: 2,
        border: 0,
        padding: 0,
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <ArrowForwardIosIcon style={{ color: "#E9ECEF" }} />
    </button>
  );
};

export default function SwipeableCarouselWinodw() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const Slide = ({ title, content }) => {
    return (
      <Box>
        <Typography
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "#E9ECEF",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <img
                src={PlaceHolderImage}
                alt="Placeholder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={6} style={{ padding: "0 50px" }}>
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#E9ECEF",
                  fontSize: "16px",

                  marginTop: 30,
                }}
              >
                {content}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box
        marginTop={3}
        marginLeft={10}
        marginRight={10}
        height={400}
        position="relative"
      >
        <Slider {...settings} style={{ padding: "0 50px" }}>
          {slideData.map((slide, index) => (
            <Slide key={index} title={slide.title} content={slide.content} />
          ))}
        </Slider>
      </Box>
    </>
  );
}
