"use client";

import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      className="fixed w-4 right-[40px] bottom-[40px] 
    h-4 text-3xl  
   
     transition-all z-50 cursor-pointer"
    >
      <FaChevronUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </button>
  );
};

export default ScrollButton;
