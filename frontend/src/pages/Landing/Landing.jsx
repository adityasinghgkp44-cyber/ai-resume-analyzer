import "./Landing.css";

import Background from "../../components/Background/Background";
import CursorGlow from "../../components/CursorGlow/CursorGlow";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Stats from "../../components/Stats/Stats";
import Working from "../../components/Working/Working";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";

function Landing() {
  return (
    <div className="landing">

      <Background />
      <CursorGlow />

      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Working />
      <Testimonials />
      <FAQ />
      <Footer />

    </div>
  );
}

export default Landing;