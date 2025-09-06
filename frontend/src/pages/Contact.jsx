import React, { useRef } from "react";
import "../styles/Contact.css";
import emailjs from "emailjs-com";

import instaLogo from "/img/instalogo.png";
import fbLogo from "/img/fblogo.png";
import gmailLogo from "/img/gmaillogo.png";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_kishore", "template_uh332vq", form.current, "M7356cdugTHrXsBek")
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Email send failed:", error);
      });

    emailjs
      .sendForm("service_kishore", "template_5yykd3b", form.current, "M7356cdugTHrXsBek")
      .then(() => {
        alert("Form submitted! Check your email.");
      })
      .catch(() => {
        alert("Failed to send email to user.");
      });

    e.target.reset();
  };

  return (
    <section className="contact-section bg-white text-black py-5">
      <div className="container mt-5 pt-5">
        <div className="row align-items-center">
          {/* Left Info Column */}
          <div className="col-lg-6 text-center text-lg-start py-4 text-black">
            <h1>Get in Contact</h1>
            <p>
              Fill out the form or send an email to{" "}
              <a href="mailto:kishoreragul0@gmail.com" className="text-warning">
                kishoreragul0@gmail.com
              </a>
            </p>
            <p>I normally reply within 24 hours, except on weekends or when on safari.</p>
            <p>If your message appears urgent, then we will reply sooner.</p>

            <h4 className="mt-4">Follow for more updates!!</h4>
            <div className="d-flex justify-content-center justify-content-lg-start mt-2 social-icons">
              <a
                href="https://www.instagram.com/vijaypranav_photography"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instaLogo} alt="Instagram" height={50} />
              </a>
              <a
                href="https://www.facebook.com/vijaypranav3888"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fbLogo} alt="Facebook" height={50} />
              </a>
              <a href="mailto:kishoreragul0@gmail.com">
                <img src={gmailLogo} alt="Gmail" height={50} />
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="col-lg-6" style={{ paddingTop: "40px" }}>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact-form bg-light p-4 rounded shadow"
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">(required)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">(required)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">(required)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactNo" className="form-label">
                  Contact No:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="contactNo"
                  name="contactNo"
                  pattern="\d{10}"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-danger">(required)</span>
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark">
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
