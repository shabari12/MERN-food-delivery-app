import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food</h2>
        <p>
          "From Our Kitchen to Your Table: Experience the Joy of Fresh, Fast,
          and Flavorful Food Delivery Right to Your Doorstep!"
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
