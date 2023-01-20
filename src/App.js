import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useState } from "react";

// App Layout
/**
 * Header
 *  - Logo
 *  - Nav Items(Right side)
 *  - Cart
 * Body
 *  - Search bar
 *  - Restaurant List
 *    - RestaurantCard
 *      - Image
 *      - Name
 *      - Rating
 *      - Cusines
 * Footer
 *  - Links
 *  - CopyRights
 */

const AppLayout = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
