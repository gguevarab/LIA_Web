// Home.js
import React from "react";
import FirstBox from "../components/landing/firstBox";
import WhatIsBox from "../components/landing/whatIsBox";
import JoinBox from "../components/landing/joinBox";
import ReviewsBox from "../components/landing/reviewsBox";
import FaqBox from "../components/landing/faqBox";
import ObjectivesBox from "../components/landing/objectivesBox";
import Footer from "../components/global/footer";
import Navbar from "../components/global/navbar";
import '../styles/pages/Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <Navbar />
      <FirstBox />
      <WhatIsBox />
      <ObjectivesBox />
      <ReviewsBox />
      <FaqBox />
      <JoinBox />
      <Footer />
    </div>
  );
}

export default Landing;
