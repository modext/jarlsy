import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { db } from "../services/firebase";

import Product from "./Product";

function Products({ type }) {
  let allProducts = useRef([]);
  const [loader, setLoader] = useState(true);
  const history = useHistory();
  const [products, setProducts] = useState({
    categories: [
      "All",
      "Hoodies & SweatShirts",
      "Tshirts & Polos",
      "Pants & Chinos",
      "Shirts",
      "Joggers"
    ],
    product: []
  });
  const [selectedTab, setSelectedTab] = useState("All");
  useEffect(() => {
    if (selectedTab === "All") {
      setProducts({ ...products, product: allProducts.current });
      return;
    }
    let selectedProduct = allProducts.current.filter(
      (item) => item.category.toLowerCase() === selectedTab.toLowerCase()
    );
    if (selectedProduct.length > 0) {
      setProducts((prev) => {
        return { ...prev, product: selectedProduct };
      });
    }
  }, [selectedTab]);
  useEffect(() => {
    async function getAllProducts() {
      try {
        const collectionRef = await getDocs(collection(db, "users"));
        let productsColl = [];
        let reviewColl = [];
        let topGrossing = [];
        collectionRef.forEach((doc) => {
          if (doc.data().type === "admin") {
            productsColl.push(
              getDocs(collection(db, "users", doc.id, "products"))
            );
            reviewColl.push(
              getDocs(collection(db, "users", doc.id, "productReviews"))
            );
            topGrossing.push(
              getDocs(collection(db, "users", doc.id, "productsAdminInfo"))
            );
          }
        });
        let response = await Promise.all(productsColl);
        let responseRev = await Promise.all(reviewColl);
        let responseAdmin = await Promise.all(topGrossing);
        let productsArr = [];
        response.forEach((elem, idx1) => {
          elem.docs.forEach((doc, idx2) => {
            if (doc.id === responseRev[idx1].docs[idx2].id) {
              productsArr.push({
                id: doc.id,
                ...doc.data(),
                ...responseRev[idx1].docs[idx2].data(),
                ...responseAdmin[idx1].docs[idx2].data()
              });
            }
          });
        });
        let filteredProducts = productsArr.sort((a, b) => {
          if (type === "Best Selling") {
            return b.revenue - a.revenue;
          }
          return b.createdAt.seconds - a.createdAt.seconds;
        });

        allProducts.current = filteredProducts;

        setProducts((prev) => {
          return { ...prev, product: filteredProducts };
        });
      } catch (err) {
        return err.message;
      }
    }
    getAllProducts().finally(() => {
      setLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex space-y-5 flex-col flex-1 relative">
      {!loader ? (
        <>
          <div className="flex space-x-1 lg:space-x-7 font-semibold">
            {products.categories.map((category, idx) => {
              return (
                <div
                  key={idx}
                  className={`transition-all text-xs lg:text-base duration-200 cursor-pointer px-1.5 lg:px-3  border-[1.5px] lg:border-[3px] border-transparent ${
                    selectedTab === category
                      ? "!border-[#FF385C]  rounded-lg"
                      : ""
                  } `}
                  onClick={() => {
                    setSelectedTab(category);
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 h-[89%] gap-3 lg:gap-5">
            {products.product
              .filter((prod) => {
                return selectedTab !== "All"
                  ? prod.category === selectedTab
                  : true;
              })
              .slice(0, 6)
              .map((prod, idx) => {
                return <Product key={idx} prodDesc={prod}></Product>;
              })}
          </div>
          <div
            onClick={() => {
              history.push("/shop/mens/clothing/all-clothing");
            }}
            className="text-sm self-center cursor-pointer hover:text-[#ff385d] transition-all duration-300 group flex items-center space-x-1"
          >
            <span>All Products</span>
            <BsArrowRight className="relative group-hover:left-[1.5px]"></BsArrowRight>
          </div>
        </>
      ) : (
        <div className="flex absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <ImSpinner2 className="animate-spin fill-current text-[#FF385C] w-12 h-12"></ImSpinner2>
        </div>
      )}
    </div>
  );
}

export default Products;
