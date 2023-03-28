import React, { useEffect, useMemo, useRef, useState } from "react";
import { ReactComponent as Bag } from "../icons/bag.svg";
import { ReactComponent as Bag2 } from "../icons/bag2.svg";
import gsap from "gsap";
import { useHistory } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/addToBag";

function Product({ prodDesc, expandHeight, elongate }) {
  const [detailView, showDetailed] = useState(false);
  const [currImg, setCurrImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [initLoad, setinitLoad] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { current: imgLength } = useRef(prodDesc.productImg.length);
  let { current: timeline } = useRef(gsap.timeline());
  let innerBox = useRef(null);
  let box = useRef(null);
  let stars = useRef(null);
  let colorPallete = useRef(null);
  let addTo = useSelector((state) => {
    return state.addToBag;
  });
  let fnd = useMemo(() => {
    return addTo.find((prod) => prod.id === prodDesc.id);
  }, [addTo]);

  useEffect(() => {
    if (detailView) {
      timeline
        .to(box.current, {
          height: "4.5rem",
          duration: ".27",
          ease: "power4.out"
        })
        .to(stars.current, {
          opacity: "1",
          duration: ".27",
          ease: "power4.out"
        })
        .to(colorPallete.current, {
          opacity: "1",
          duration: ".27",
          ease: "power4.out"
        });
    } else {
      box.current &&
        timeline.to(box.current, {
          height: "auto",
          duration: ".27",
          ease: "power4.out"
        });
    }
    return () => {
      setCurrImg(0);
    };
  }, [detailView, timeline]);

  useEffect(() => {
    let timer;
    if (detailView && imgLoaded) {
      timer = setTimeout(() => {
        setImgLoaded(false);
        setCurrImg((prev) => {
          return prev >= imgLength - 1 ? 0 : prev + 1;
        });
      }, 3500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [detailView, imgLoaded, currImg, imgLength]);

  function shortenTitle(title) {
    if (title.length > 31) {
      return `${title.substr(0, 32)}..`.toLowerCase();
    }
    return title.toLowerCase();
  }
  function setLocalStorage() {
    let exists = localStorage.getItem("recentlyViewed");
    if (exists) {
      let prodExists = JSON.parse(exists).find(
        (prod) => prod.id === prodDesc.id
      );
      if (prodExists) {
        return;
      }
      let newArr = [...JSON.parse(exists), prodDesc];
      localStorage.setItem("recentlyViewed", JSON.stringify(newArr));
    } else {
      localStorage.setItem("recentlyViewed", JSON.stringify([prodDesc]));
    }
  }
  return (
    <>
      <div
        onClick={() => {
          let title = prodDesc.title.split(" ").join("-");
          title = title.includes("/")
            ? title.replace("/", "-")
            : title.includes("%")
            ? title.replace("%", "-")
            : title;
          let brand = prodDesc.brand.split(" ").join("-");
          setLocalStorage();
          history.push(`/product/${brand}/${title}/${prodDesc.id}`);
        }}
        onMouseEnter={() => {
          showDetailed(true);
        }}
        onMouseLeave={() => {
          showDetailed(false);
        }}
        className={` ${expandHeight ? "h-[417px]" : "min-h-[370px] "} ${
          elongate ? "h-[450px]" : ""
        } rounded-md w-full  cursor-pointer overflow-hidden relative`}
      >
        <img
          onLoad={() => {
            if (!currImg) setinitLoad(true);
            setImgLoaded(true);
          }}
          src={prodDesc.productImg[currImg]}
          className={`w-full   ${
            initLoad ? "" : "bg-gray-200 blur-sm"
          }  h-full object-cover`}
          alt=""
        />
        <div
          ref={box}
          className={`box absolute bottom-2 shadow-sm_dark cursor-pointer rounded-md  bg-white w-secFull -translate-x-1/2 left-1/2 text-[13px] p-1.5 px-2 flex flex-col justify-center`}
        >
          <div ref={innerBox} className="flex items-center justify-between">
            <div>
              <div className="font-normal capitalize">
                {shortenTitle(prodDesc.title)}
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="font-semibold">
                  ${(Math.round(prodDesc.prize * 100) / 100).toFixed(2)}
                </div>
                {detailView && (
                  <div ref={stars} className="opacity-0">
                    <Rating reviews={prodDesc.reviews}></Rating>
                  </div>
                )}
              </div>
              {detailView && (
                <div
                  ref={colorPallete}
                  className="flex space-x-1 mt-1 opacity-0"
                >
                  <div
                    style={{ backgroundColor: `${prodDesc.colour}` }}
                    className={`w-[9px] h-[9px] rounded-full ${
                      prodDesc.colour === "white" &&
                      "bg-white border-[1.5px]  border-black"
                    }`}
                  ></div>
                </div>
              )}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (!fnd) {
                  dispatch(add(prodDesc, 1));
                } else {
                  dispatch(remove(prodDesc));
                }
              }}
            >
              {fnd ? (
                <Bag2 className="w-7 text-[#FF385C] h-7 fill-current  transition-all duration-200  "></Bag2>
              ) : (
                <Bag
                  className={`w-7 text-transparent  hover:text-black hover:fill-current
                 h-7 fill-current  transition-all duration-200  `}
                ></Bag>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
