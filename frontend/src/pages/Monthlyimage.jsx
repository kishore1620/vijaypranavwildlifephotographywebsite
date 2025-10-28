import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/monthlyimage.css";

const images = [
  { month: "OCT", src: "img/Asian wild dog 18 October 2022.jpg", alt: "asian-wild dog", link: "https://www.instagram.com/p/Cj3DJ97oWYS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "OCT 2022" },
  { month: "NOV", src: "img/Bee eater 22 nov 2020.jpg", alt: "Bee Eater", link: "https://www.instagram.com/p/CH5KFt2pmuP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "NOV 2020" },
  { month: "JUL", src: "img/Black rumped flameback 6 July 2022.jpg", alt: "Black rumped flameback", link: "https://www.instagram.com/p/Cfq75BfJbdD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "JUL 2022" },
  { month: "NOV", src: "img/Blonde 'n' blue 26 Nov 2020.jpg", alt: "Blonde n blue", link: "https://www.instagram.com/p/CIDdREQJkc0/?utm_source=ig_web_copy_link", title: "NOV 2020" },
  { month: "JUL", src: "img/Butterfly 14 July 2020.jpg", alt: "Butterfly", link: "https://www.instagram.com/p/CCnXC28Mexs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "JUL 2020" },
  { month: "DEC", src: "img/Cormorant 31 dec 2018.jpg", alt: "Cormorant", link: "https://www.instagram.com/p/CYJbQ1ypL6p/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "DEC 2020" },
  { month: "JUN", src: "img/deer 2 june 2022.JPG", alt: "deer", link: "https://www.instagram.com/p/CeTY3zwJTCt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "JUN 2020" },
  { month: "JAN", src: "img/donkey.JPG", alt: "donkey", link: "https://www.instagram.com/p/DExAzkQJ-iw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "JAN 2020" },
  { month: "DEC", src: "img/Egret 28 dec 2019.jpg", alt: "Egret", link: "https://www.instagram.com/p/B6nVZ3kFORo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "DEC 2020" },
  { month: "AUG", src: "img/elephant.JPG", alt: "elephant", link: "https://www.instagram.com/p/Cg4SmOTJDW9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "AUG 2022" },
  { month: "MAY", src: "img/Eye_spy_birds may 15 2021.jpg", alt: "Eye_spy_birds", link: "https://www.instagram.com/p/CO5MZisJH4m/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAY 2021" },
  { month: "MAR", src: "img/Gray Langur 8 mar 2022.jpg", alt: "Gray Langur", link: "https://www.instagram.com/p/Ca18f33JlrP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAR 2022" },
  { month: "JUN", src: "img/Hawk eagle 30 June 2022.jpg", alt: "Hawk eagle", link: "https://www.instagram.com/p/CfbmBejpwUw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "JUN 2022" },
  { month: "OCT", src: "img/Hoooie display it's crown oct 14 2020.jpg", alt: "Hoooie", link: "https://www.instagram.com/p/CGUhYsYJKcx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "OCT 2020" },
  { month: "MAR", src: "img/hummingbird.JPG", alt: "hummingbird", link: "https://www.instagram.com/p/DGNtg2fJKqB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAR 2022" },
  { month: "MAR", src: "img/Little egret mar 26 2021.jpg", alt: "Little egret", link: "https://www.instagram.com/p/CM4iJbBJgJo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAR 2021" },
  { month: "FEB", src: "img/Little fella 2 Feb 2022.jpg", alt: "Little fella", link: "https://www.instagram.com/p/CZeZeJ-JvM3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "FEB 2022" },
  { month: "MAY", src: "img/Parrot 6 may 2020.jpg", alt: "Parrot", link: "https://www.instagram.com/p/B_1iZKegLmJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAY 2022" },
  { month: "NOV", src: "img/Peacock Nov 18 2020.jpg", alt: "Peacock", link: "https://www.instagram.com/p/CHu253spb-s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "NOV 2022" },
  { month: "MAR", src: "img/Tickle blue fly catcher14 mar 2022.jpg", alt: "Tickle blue fly catcher", link: "https://www.instagram.com/p/CbFZQy-JdB6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "MAR 2022" },
  { month: "SEP", src: "img/White throated kingfisher mar 23 2021.jpg", alt: "", link: "https://www.instagram.com/p/CMwKPd0pCcr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "SEP 2022" },
  { month: "SEP", src: "img/Pied cuckoo 20 Sep 2021.jpg", alt: "Pied cuckoo", link: "https://www.instagram.com/p/CUCygJToIZP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "SEP 2022" },
  { month: "APR", src: "img/spike bird 12 APR 2022.JPG", alt: "", link: "https://www.instagram.com/p/Ck3WtqnJv50/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "APR 2022" },
  { month: "FEB", src: "img/SARUS CRANES 14 FEB.JPG", alt: "SARUS CRANES", link: "https://www.instagram.com/p/DGDaXBHp9rb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "FEB 2022" },
  { month: "APR", src: "img/Monkey mother love 16 apr 2022.jpg", alt: "Monkey mother love", link: "https://www.instagram.com/p/CcaXf4Np-K6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "APR 2022" },
  { month: "AUG", src: "img/Sambar deer 23 aug 2022.jpg", alt: "Sambar Deer", link: "https://www.instagram.com/p/ChmiCiEpZ7g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "AUG 2022" },
  { month: "AUG", src: "img/Vernal hanging parrot 9 Aug 2022.jpg", alt: "hanging Parrot", link: "https://www.instagram.com/p/ChCsplbpV5l/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", title: "AUG 2022" },
  { month: "JAN", src: "img/tiger-with-son-10-JAN.JPG", alt: "tiger with son", link: "https://www.instagram.com/vijaypranav_photography/p/Cg4SmOTJDW9", title: "JAN 2024" }
];

const months = ["ALL", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function MonthlyImage() {
  const [selectedMonth, setSelectedMonth] = useState("ALL");

  const filteredImages = selectedMonth === "ALL" ? images : images.filter(img => img.month === selectedMonth);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4" style={{ marginTop: "120px" }}>FILTER THE IMAGES BY THE MONTH</h2>
      <div className="month-buttons mb-4 text-center">
        {months.map(month => (
          <button key={month} className="btn btn-outline-primary m-1" onClick={() => setSelectedMonth(month)}>
            {month}
          </button>
        ))}
      </div>
      <div className="image-grid row justify-content-center" id="imageContainer">
        {filteredImages.map((img, index) => (
          <div key={index} className="card m-2" style={{ width: "18rem" }}>
            <a href={img.link} target="_blank" rel="noopener noreferrer">
              <img src={img.src} className="card-img-top" alt={img.alt} />
            </a>
            <div className="card-body text-center">
              <h5 className="card-title">{img.title}</h5>
              <p className="hover-text">Click to view on Instagram</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
