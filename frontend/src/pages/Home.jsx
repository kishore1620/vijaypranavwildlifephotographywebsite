import React from "react";
import "../styles/Home.css";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

// Import images if inside src, otherwise place in public folder
// Example for public folder: /img/lion.JPG

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero fade-in"
        style={{
          backgroundImage: "url('/img/red-headed-bunting-22-mar-2025.jpg')",
          height: "100vh",
        }}
      >
        <div className="container hero-content">
          <h2
            className="display-2 fw-bolder text-center text-white"
            style={{ marginTop: "600px" }}
          >
            <Typewriter
              words={[`VIJAY PRANAV'S \nWILD LIFE PHOTOGRAPHY`]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light fade-in">
        <div className="container text-center">
          <p className="fs-4">
            VIJAY PRANAV is a professional wildlife photographer based in
            Coimbatore, Tamil Nadu
          </p>
          <p className="fst-italic">
            "All I really wanted to do was wildlife photography" – Nigel Dennis
          </p>
        </div>
      </section>

      {/* Store Section */}
      <section className="py-5 fade-in text-center">
        <div className="container">
          <h2>
            <Link to="/store" className="text-decoration-none text-dark">
              Photographic Wildlife Art Prints
            </Link>
          </h2>
          <p className="mt-4">
            I offer fine art wildlife photography{" "}
            <Link to="/store" className="text-danger">
              prints
            </Link>{" "}
            suitable for framing either as open or limited editions in colour or
            black and white.
          </p>
          <p>
            All wildlife wall art is printed on gallery-quality fine art paper
            to ensure a long life.
          </p>
          <p>
            I seek to create my photographs of wild animals in camera, opting
            not to digitally alter them afterwards.
          </p>
          <p>
            My subjects therefore retain their natural realism within a
            singular moment in time.
          </p>
          <p>
            Visit my online{" "}
            <Link to="/store" className="text-danger">
              store
            </Link>{" "}
            to view wildlife art prints and limited edition wildlife prints that
            are available for purchase.
          </p>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-light py-5 fade-in">
        <div className="container text-center">
          <h1 className="mb-5">Wildlife Photography Galleries</h1>
          <div className="row g-4">
            <div className="col-md-6">
              <a
                href="https://www.instagram.com/p/DFkiXebp7lc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/img/lion.JPG"
                  alt="Lion"
                  className="gallery-img img-fluid rounded shadow"
                />
              </a>
              <p className="mt-3">Wanna explore more!!</p>
              <Link to="/gallery" className="btn btn-dark mt-2">
                GO TO GALLERY
              </Link>
            </div>
            <div className="col-md-6">
              <a
                href="https://www.instagram.com/p/DEpSa-EPSYX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/img/tiger-with-son-10-JAN.JPG"
                  alt="Tiger"
                  className="gallery-img img-fluid rounded shadow"
                />
              </a>
              <p className="mt-3">Wanna explore more!!</p>
              <Link to="/gallery" className="btn btn-dark mt-2">
                GO TO GALLERY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
