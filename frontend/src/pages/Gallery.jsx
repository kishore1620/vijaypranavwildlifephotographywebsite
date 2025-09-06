// src/pages/Gallery.jsx
import React from "react";
import "../styles/gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Gallery() {
  return (
    <div>
      <div className="gallery">
        <h1>WILDLIFE PHOTOGRAPHY GALLERY</h1>
      </div>

      <br />
      <br />

      <div className="content1">
        <p>A little inspiration to get out and explore:</p>
      </div>

      <br />
      <br />

      <div className="month" id="imageContainer">
        <Link to="/monthlyimage">
          <button>Click here to explore our Image of the Month</button>
        </Link>
      </div>

      <br />
      <br />

      <div className="image">
        {galleryItems.map((item, index) => (
          <div key={index} className={`image${index + 1} card`}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.src} alt={item.alt} height="100%" width="100%" />
              <div className="hover-text">
                Click on the image to visit our instagram post
              </div>
            </a>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
}

const galleryItems = [
  { src: "/img/hummingbird.JPG", alt: "image1", link: "https://www.instagram.com/p/DGNtg2fJKqB/" },
  { src: "/img/hyena.JPG", alt: "image2", link: "https://www.instagram.com/p/DGuPC1xpjrw/" },
  { src: "/img/Bee eater 22 nov 2020.jpg", alt: "image3", link: "https://www.instagram.com/p/CH5KFt2pmuP/" },
  { src: "/img/Blonde 'n' blue 26 Nov 2020.jpg", alt: "image4", link: "https://www.instagram.com/p/CIDdREQJkc0/" },
  { src: "/img/Butterfly 14 July 2020.jpg", alt: "image5", link: "https://www.instagram.com/p/CCnXC28Mexs/" },
  { src: "/img/Egret 28 dec 2019.jpg", alt: "image6", link: "https://www.instagram.com/p/B6nVZ3kFORo/" },
  { src: "/img/donkey.JPG", alt: "image7", link: "https://www.instagram.com/p/DExAzkQJ-iw/" },
  { src: "/img/Eye_spy_birds may 15 2021.jpg", alt: "image8", link: "https://www.instagram.com/p/CO5MZisJH4m/" },
  { src: "/img/Hoooie display it's crown oct 14 2020.jpg", alt: "image9", link: "https://www.instagram.com/p/CGUhYsYJKcx/" },
  { src: "/img/Little egret mar 26 2021.jpg", alt: "image10", link: "https://www.instagram.com/p/CM4iJbBJgJo/" },
  { src: "/img/Lizard 21 June 202.jpg", alt: "image11", link: "https://www.instagram.com/p/CBC6VDfM1CI/" },
  { src: "/img/Parrot 6 may 2020.jpg", alt: "image12", link: "https://www.instagram.com/p/B_1iZKegLmJ/" },
  { src: "/img/Peacock Nov 18 2020.jpg", alt: "image13", link: "https://www.instagram.com/p/CHu253spb-s/" },
  { src: "/img/Pied cuckoo Dec 9 2020.jpg", alt: "image14", link: "https://www.instagram.com/p/CIk_Cn4JW_5/" },
  { src: "/img/Plain prinia Aug 23 2020.jpg", alt: "image15", link: "https://www.instagram.com/p/CEOOYO7s72l/" },
  { src: "/img/White throated kingfisher mar 23 2021.jpg", alt: "image16", link: "https://www.instagram.com/p/CMwKPd0pCcr/" },
  { src: "/img/Red-wattled lapwing may 11 2021.jpg", alt: "image17", link: "https://www.instagram.com/p/COu5OOrp84k/" },
  { src: "/img/Purple-rumped sunbird Nov 13 2020.jpg", alt: "image18", link: "https://www.instagram.com/p/CHh-7YqpugG/" },
  { src: "/img/deer 2 june 2022.JPG", alt: "image19", link: "https://www.instagram.com/p/CeTY3zwJTCt/" },
  { src: "/img/Asian wild dog 18 October 2022.jpg", alt: "image20", link: "https://www.instagram.com/p/Cj3DJ97oWYS/" },
  { src: "/img/Hawk eagle 30 June 2022.jpg", alt: "image21", link: "https://www.instagram.com/p/CfbmBejpwUw/" },
  { src: "/img/Cormorant 31 dec 2018.jpg", alt: "image22", link: "https://www.instagram.com/p/CYJbQ1ypL6p/" },
  { src: "/img/Purple sunbird 20 mar 2020.jpg", alt: "image23", link: "https://www.instagram.com/p/B99EdZ3AvQC/" },
  { src: "/img/Deer 21 jan 2021.jpg", alt: "image24", link: "https://www.instagram.com/p/CjNiaCnprpJ/" },
  { src: "/img/Black rumped flameback 6 July 2022.jpg", alt: "image25", link: "https://www.instagram.com/p/Cfq75BfJbdD/" },
  { src: "/img/Gray Langur 8 mar 2022.jpg", alt: "image26", link: "https://www.instagram.com/p/Ca18f33JlrP/" },
];
