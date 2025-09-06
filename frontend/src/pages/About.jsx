import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "../styles/about.css";
import wildlifeImage from "/img/profile.jpg";  // ✅ make sure image is in src/assets/img

const About = () => {
  return (
    <section className="about-section py-5 text-black">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section */}
          <motion.div
            className="col-lg-5 text-center mb-4 mb-lg-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={wildlifeImage}
              alt="Wildlife Photographer"
              className="img-fluid rounded shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="col-lg-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="fw-bold mb-3 text-warning">
              <Typewriter
                words={["About Me", "Wildlife Photographer"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>
            <p className="lead text-black">
              Hello! I'm <strong>Vijay Pranav</strong>, a passionate wildlife
              photographer dedicated to capturing the untamed beauty of nature.
              My work reflects my deep connection with wildlife and my
              commitment to preserving their stories through photography.
            </p>
            <p className="text-black">
              From the roaring lions of the savannah to the delicate flutter of
              a butterfly's wings, I strive to showcase the beauty and fragility
              of our planet’s creatures. Through my lens, I hope to inspire
              others to appreciate and protect our natural world.
            </p>
            <a
              href="https://www.instagram.com/vijaypranav_photography"
              className="btn btn-warning mt-3"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i> Follow me on Instagram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
