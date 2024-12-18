import { useState } from "react";
import "./titles.css";

const MainHeading = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  const toggleShrink = () => {
    setIsShrunk(!isShrunk);
  };

  return (
    <div className={`mainheading-wrapper w-[100%] flex items-center ${isShrunk ? "shrunk" : ""}`}>
      <img
        src="/moae/moae-logo.svg"
        className="logo w-[150px] cursor-pointer"
        onClick={toggleShrink}
        alt="MOAE Logo"
      />
      <h1 className={`oswald w-[100%] text-left text-white ${isShrunk ? "shrunk" : ""}`}>
        MOAE
      </h1>
    </div>
  );
};

export default MainHeading;
