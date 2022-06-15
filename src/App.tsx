import React from "react";
import "./App.scss";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Banner } from "./components/banner/Banner";
import { Stocks } from "./components/stocks/Stocks";

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Stocks />
      <Footer />
    </div>
  );
}

export default App;
