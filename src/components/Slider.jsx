import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import data from "../data";

const Slider = () => {
   const [recensioni, setRecensioni] = useState(data);
   const [active, setActive] = useState(3);

   // prossima slide
   const next = () => {
      setActive((prevValue) => {
         if (prevValue + 1 > recensioni.length - 1) {
            return 0;
         } else {
            return prevValue + 1;
         }
      });
   };

   // precedente slide

   const prev = () => {
      setActive((prevValue) => {
         if (prevValue - 1 < 0) {
            return recensioni.length - 1;
         } else {
            return prevValue - 1;
         }
      });
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         next();
      }, 4000);
      return () => clearTimeout(timer);
   }, [active]);

   return (
      <div className="container slider">
         {recensioni.map((recensione, index) => {
            let positionClass = "";
            if (index === active) {
               positionClass = "active";
            } else if (
               index + 1 === active ||
               (active === 0 && index === recensioni.length - 1)
            ) {
               positionClass = "prev";
            } else {
               positionClass = "next";
            }
            return (
               <Slide
                  key={recensione.id}
                  {...recensione}
                  classes={positionClass}
               />
            );
         })}
         <div className="btn-group slider-btn-group">
            <button className="btn btn-slider prev-slide" onClick={prev}>
               prev
            </button>
            <button className="btn btn-slider next-slide" onClick={next}>
               next
            </button>
         </div>
      </div>
   );
};

export default Slider;
