import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "../components/landing/HeroSection"
import CategorySection from "../components/landing/CategorySection";
import FeatureSection from "../components/landing/FeatureSection";
import AboutSection from "../components/landing/AboutSection";
import ReviewSection from "../components/landing/ReviewSection";


const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection/>
      <FeatureSection/>
      <AboutSection/>
      <ReviewSection/>
    </>

  )
};

export default LandingPage;
