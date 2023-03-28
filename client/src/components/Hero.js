import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Bag } from "../icons/bag.svg";
import gsap from "gsap";
import useWindow from "../hooks/useWindow";
import { useHistory } from "react-router-dom";

function Hero({ modalOpen }) {
  const timeline = useRef(gsap.timeline());
  const [width] = useWindow();
  const { current: heroInfo } = useRef([
    {
      heading: "Stratnum/Collection",
      logo: "/img/logos/levis.png",
      para: "New Collection for Winters",
      img: "/img/banner1.webp",
      link: "/shop/mens/brand/levis"
    },
    {
      heading: "Diversity/Collection",
      logo: "/img/logos/vans.png",
      para: "Be diverse with Vans diversity collection",
      img: "/img/banner2.webp",
      link: "/shop/mens/brand/vans"
    },
    {
      heading: "AIR JORDAN/BUCKS-23",
      logo: "/img/logos/nike.png",
      para: "Be a force with bucks-23 by nike",
      img: "/img/banner3.webp",
      link: "/shop/mens/brand/nike"
    },
    {
      heading: "COLLUSION/BEANIE- 45",
      logo: "/img/logos/collusion.png",
      para: "Wear with style in winters",
      img: "/img/banner4.webp",
      link: "/shop/mens/brand/champion"
    }
  ]);
  const [idx, setIdx] = useState(0);
  const history = useHistory();
  useEffect(() => {
    let time;

    if (!modalOpen) {
      time = setTimeout(() => {
        setIdx((prev) => {
          return prev !== heroInfo.length - 1 ? prev + 1 : 0;
        });
      }, 12000);
    }
    return () => {
      if (time) clearTimeout(time);
    };
  }, [idx, modalOpen]);

  useEffect(() => {
    timeline.current
      .to(".hero-bg", {
        scale: 1,
        duration: ".6"
      })
      .to(".head", {
        y: 0,
        duration: ".6",
        stagger: ".4",
        delay: ".2",
        ease: "back.out(2)"
      })
      .to(".logo", {
        opacity: 1
      })
      .to(".para", {
        opacity: 1
      })
      .to(".main-btn", {
        duration: ".1",
        y: 0,
        opacity: 1,
        ease: "back.out(2)"
      });
    return () => {
      timeline.current.seek(0);
    };
  }, [idx]);

  return (
    <>
      <div
        className="hero-bg bg-no-repeat w-full lg:bg-center bg-cover h-small lg:bg-cover lg:h-large relative "
        style={{
          backgroundImage: `url(${heroInfo[idx].img})`,
          transform: "scale(.97)"
        }}
      >
        <div className="absolute top-1/2 z-50 opacity-90 -translate-y-1/2 space-y-1 lg:space-y-2  left-1 lg:left-2.5">
          {[...Array(heroInfo.length)].map((_, index) => {
            return (
              <div
                key={index}
                onClick={(_) => {
                  setIdx(index);
                }}
                className={`w-1 h-1 lg:w-3 lg:h-3 cursor-pointer transition-all duration-500 ${
                  idx === index ? "bg-white" : "bg-transparent"
                }  rounded-full border-[.5px] lg:border-2 border-black`}
              ></div>
            );
          })}
        </div>
        <div className="transform w-full lg:w-4/6 top-1/2 -translate-y-1/2 pl-4 lg:pl-11 relative">
          <img
            src={`${heroInfo[idx].logo}`}
            className="logo opacity-0 w-3 lg:w-14 lg:mb-1"
            alt=""
          />
          <h1 className="font-extrabold leading-7 uppercase text-2xl lg:text-8xl">
            {heroInfo[idx].heading.split("/").map((elem, idx) => {
              return (
                <div key={idx} className="overflow-hidden">
                  <span
                    className={`head block transform translate-y-24 ${
                      idx === heroInfo[idx].heading.split("/").length - 1
                        ? "text-black"
                        : "text-white"
                    } `}
                  >
                    {elem}
                  </span>
                </div>
              );
            })}
          </h1>
          <p className="para font-secondary mt-2 lg:mt-7 text-xs lg:text-3xl opacity-0 text-gray-800">
            {heroInfo[idx].para}
          </p>
          {width > 700 ? (
            <button
              onClick={() => {
                history.push(heroInfo[idx].link);
              }}
              className={`main-btn hover:scale-x-105 opacity-0 translate-y-6 hover:pr-14 transform group bg-black shadow-dark after:absolute hover:after:h-full hover:after:opacity-100 hover:text-black after:-z-1 z-0  after:transition-all after:duration-500 after:w-full after:opacity-0 after:bg-white after:top-0 after:left-0 after:rounded-lg after:h-2 transition-all duration-200  text-white px-11 mt-9  hover:shadow-darkest py-4 font-bold  text-xl rounded-lg  relative`}
            >
              <span className=" .backface-hidden group-hover:-ml-1.5 relative group-hover:mr-1 transition-all duration-100">
                Shop Now
              </span>
              <Bag className="w-8 h-8 group-hover:opacity-100 group-hover:animate-wiggle absolute right-6 top-3.5 transition-all fill-current text-transparent  duration-300 opacity-0 peer"></Bag>
            </button>
          ) : (
            <button
              onClick={() => {
                history.push(heroInfo[idx].link);
              }}
              className="bg-black shadow-dark text-[6px] text-white px-1 mt-2  rounded-sm font-bold py-1"
            >
              Shop Now
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
