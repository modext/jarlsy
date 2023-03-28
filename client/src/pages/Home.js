import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import FeatureSec from "../components/FeatureSec";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import Section from "../components/Section";
import StyleBanner from "../components/StyleBanner";

function Home() {
  const modal = useSelector((state) => {
    return state.modal;
  });
  return (
    <>
      <div className={`relative  max-w-screen-2xl m-auto overflow-hidden`}>
        <Hero modalOpen={modal.modal}></Hero>
        <Banner></Banner>
        <ProductSection
          type="Trending Products"
          ImgAlignment="left"
        ></ProductSection>
        <StyleBanner></StyleBanner>
        <ProductSection
          type="Best Selling"
          ImgAlignment="right"
        ></ProductSection>
        <Brands></Brands>
        <Section></Section>
        <FeatureSec></FeatureSec>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
