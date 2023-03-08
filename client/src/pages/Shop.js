import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterType from "../components/Shop/FilterType";
import { db } from "../services/firebase";
import data from "../data/FilterItems.json";
import Product from "../components/Product";
import Sort from "../components/Shop/Sort";
import Footer from "../components/Footer";

function Shop() {
  const [products, setProducts] = useState([]);
  const allProducts = useRef([]);
  const cloned = useRef([]);
  const index = useRef(1);
  const currVal = useRef("");
  let firstRender = useRef(true);
  let { id, type, navType } = useParams();
  const filterType = useRef(data);
  const [reset, setReset] = useState("");
  const [loader, setLoader] = useState(true);
  const [selectedVals, setSelectedVals] = useState([]);

  function getSelectedVals(obj) {
    setSelectedVals((prev) => {
      let elementExists = prev.find((elem) => {
        return elem.value === obj.value;
      });
      if (elementExists) {
        let filteredValue = prev.filter((el) => {
          return el.value !== obj.value;
        });
        return [...filteredValue];
      }
      return [...prev, obj];
    });
  }

  function catogExists(val) {
    return selectedVals.filter((type) => {
      return type.type === val;
    });
  }
  function sortPrize(itemClicked) {
    let sorted = [];
    if (itemClicked === "Lowest Price") {
      sorted = allProducts.current.sort((a, b) => {
        return a.prize - b.prize;
      });
    }
    if (itemClicked === "Highest Price") {
      sorted = allProducts.current.sort((a, b) => {
        return b.prize - a.prize;
      });
    }
    if (itemClicked === "Recommended") {
      sorted = allProducts.current.sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });
    }
    return sorted;
  }

  function filterOnSort(itemClicked) {
    let sorted = sortPrize(itemClicked);
    allProducts.current = sorted;
    setProducts(sorted.slice(0, index.current * 25));
  }
  function filterDynamic(
    type,
    alreadyFiltered,
    filteredDepend,
    alias = undefined
  ) {
    let values = (alreadyFiltered ? filteredDepend : cloned.current).filter(
      (item) => {
        let defVal = false;
        type.forEach((el) => {
          if (
            item[alias || el.type.toLowerCase()].toLowerCase() ===
            el.value.toLowerCase()
          ) {
            defVal = true;
          }
        });
        return defVal;
      }
    );
    return values;
  }
  useEffect(() => {
    if (!firstRender.current) {
      let categFilter = catogExists("Category");
      let filteredValues = [];
      if (categFilter.length > 0) {
        filteredValues = filterDynamic(categFilter, false, []);
      }

      let brandFilter = catogExists("Brand");
      if (categFilter.length > 0 && brandFilter.length > 0) {
        filteredValues = filterDynamic(brandFilter, true, filteredValues);
      } else if (brandFilter.length > 0) {
        filteredValues = filterDynamic(brandFilter, false, []);
      }

      let colourFilter = catogExists("Colour");
      if (
        (brandFilter.length > 0 || categFilter.length > 0) &&
        colourFilter.length > 0
      ) {
        filteredValues = filterDynamic(colourFilter, true, filteredValues);
      } else if (colourFilter.length > 0) {
        filteredValues = filterDynamic(colourFilter, false, []);
      }

      let styleFilter = catogExists("Style");
      if (
        (colourFilter.length > 0 ||
          brandFilter.length > 0 ||
          categFilter.length > 0) &&
        styleFilter.length > 0
      ) {
        filteredValues = filterDynamic(styleFilter, true, filteredValues);
      } else if (styleFilter.length > 0) {
        filteredValues = filterDynamic(styleFilter, false, []);
      }

      let patternFilter = catogExists("Pattern");
      if (
        (colourFilter.length > 0 ||
          brandFilter.length > 0 ||
          categFilter.length > 0 ||
          styleFilter.length > 0) &&
        patternFilter.length > 0
      ) {
        filteredValues = filterDynamic(patternFilter, true, filteredValues);
      } else if (patternFilter.length > 0) {
        filteredValues = filterDynamic(patternFilter, false, []);
      }

      let materialFilter = catogExists("Material");
      if (
        (colourFilter.length > 0 ||
          brandFilter.length > 0 ||
          categFilter.length > 0 ||
          styleFilter.length > 0 ||
          patternFilter.length > 0) &&
        materialFilter.length > 0
      ) {
        filteredValues = filterDynamic(
          materialFilter,
          true,
          filteredValues,
          "madewith"
        );
      } else if (materialFilter.length > 0) {
        filteredValues = filterDynamic(materialFilter, false, [], "madewith");
      }
      let sizeFilter = catogExists("Size");

      if (selectedVals.length === 0 || sizeFilter.length > 0) {
        allProducts.current = cloned.current;
        setProducts(allProducts.current.slice(0, index.current * 25));
        return;
      }
      allProducts.current = filteredValues;
      setProducts(filteredValues);
    }
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVals]);

  useEffect(() => {
    async function getAllProducts() {
      setLoader(true);
      try {
        const collectionRef = await getDocs(collection(db, "users"));
        let productsColl = [];
        let reviewColl = [];
        collectionRef.forEach((doc) => {
          if (doc.data().type === "admin") {
            productsColl.push(
              getDocs(collection(db, "users", doc.id, "products"))
            );
            reviewColl.push(
              getDocs(collection(db, "users", doc.id, "productReviews"))
            );
          }
        });

        let response = await Promise.all(productsColl);
        let responseRev = await Promise.all(reviewColl);
        let productsArr = [];
        response.forEach((elem, idx1) => {
          elem.docs.forEach((doc, idx2) => {
            if (doc.id === responseRev[idx1].docs[idx2].id) {
              productsArr.push({
                id: doc.id,
                ...doc.data(),
                ...responseRev[idx1].docs[idx2].data()
              });
            }
          });
        });

        let filteredProducts = [];
        if (id === "all-clothing") {
          filteredProducts = productsArr
            .filter((product) => {
              return product.for.toLowerCase() === type.toLowerCase();
            })
            .sort((a, b) => {
              return b.createdAt.seconds - a.createdAt.seconds;
            });
        } else {
          filteredProducts = productsArr
            .filter((prod) => {
              return (
                id.split("-").join(" ").toLowerCase() ===
                prod[
                  navType === "clothing" ? "category" : navType.toLowerCase()
                ].toLowerCase()
              );
            })
            .sort((a, b) => {
              return b.createdAt.seconds - a.createdAt.seconds;
            });
        }
        allProducts.current = filteredProducts;
        cloned.current = filteredProducts;
        setProducts(filteredProducts.slice(0, 25));
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    }
    getAllProducts();
  }, [id, navType, type]);

  return (
    <>
      {loader && (
        <div className="fixed w-full  top-0 h-full z-50 bg-[#000000cc]"></div>
      )}
      <div className={`min-h-[80vh] max-w-screen-2xl m-auto `}>
        <div className={`flex space-x-2.5`}>
          <div className="w-[18%] max-w-[400px] p-6">
            <div className="flex justify-between items-center">
              <div className="text-md font-medium">Filters</div>
              <div
                onClick={() => {
                  setSelectedVals([]);
                }}
                className="text-xs relative transition-all duration-200 hover:after:top-[95%] after:top-[90%] after:left-0 after:absolute after:bg-gray-700 after:w-full after:h-[1px] cursor-pointer text-gray-700"
              >
                Clear Filters
              </div>
            </div>
            <div className="mt-4">
              {filterType.current.map((type, idx) => {
                if (
                  id !== "all-clothing" &&
                  navType === "brand" &&
                  type.type === "Brand"
                ) {
                  return null;
                }
                return (
                  <FilterType
                    key={idx}
                    getPrice={(val) => {
                      if (selectedVals.length > 0) {
                        setProducts((prev) => {
                          return [
                            ...prev.filter(
                              (el) => el.prize >= val[0] && el.prize <= val[1]
                            )
                          ];
                        });
                      } else {
                        setProducts((_) => {
                          return [
                            ...allProducts.current.filter(
                              (el) => el.prize >= val[0] && el.prize <= val[1]
                            )
                          ];
                        });
                      }
                    }}
                    selectedVals={selectedVals}
                    getSelectedVals={getSelectedVals}
                    type={type}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex-1 p-6 pl-0 relative">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm">
                  Home/<span className="capitalize">{type}</span>
                </span>
                <span className="font-medium  text-[1.1rem]">
                  All <span className="capitalize">{type}</span> Clothing
                  <span>({allProducts.current.length}) items </span>
                </span>
              </div>
              <Sort liftDropdownItem={filterOnSort}></Sort>
            </div>
            {products.length > 0 && !loader ? (
              <>
                <div className="grid grid-cols-4 mt-3 gap-3">
                  {products.map((prod, idx) => {
                    return (
                      <Product
                        key={idx}
                        expandHeight={true}
                        prodDesc={prod}
                      ></Product>
                    );
                  })}
                </div>
                <div className="text-center mt-6">
                  <div>
                    <div className="font-bold text-small">
                      Showing {products.length} of {allProducts.current.length}{" "}
                      items
                    </div>
                    <div className="h-1.5 relative w-4/12 m-auto my-2.5">
                      <div
                        style={{
                          width: `${
                            (products.length / allProducts.current.length) * 100
                          }%`
                        }}
                        className={`absolute rounded-l-sm top-0 h-full left-0 transition-all duration-200 after:h-2.5 after:w-0.5 after:absolute after:-translate-y-1/2  after:top-1/2 after:left-full after:bg-black bg-black`}
                      ></div>
                      <div className="bg-gray-300 rounded-sm h-full w-full"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        Math.floor(allProducts.current.length / 25) >
                        index.current
                      ) {
                        index.current += 1;
                        setProducts(
                          allProducts.current.slice(0, index.current * 25)
                        );
                      } else {
                        if (allProducts.current.length === products.length) {
                          return;
                        } else {
                          setProducts(
                            allProducts.current.slice(
                              0,
                              allProducts.current.length
                            )
                          );
                        }
                      }
                    }}
                    className="bg-[#000000] mt-2  hover:shadow-sm_dark transition-all duration-300  font-bold rounded-md px-3 text-white text-small p-2.5 w-max "
                  >
                    <span>Load More Products</span>
                  </button>
                </div>
              </>
            ) : (
              !loader && (
                <div className="h-full">
                  <div className="w-[35%] relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                    <div className="text-center absolute top-[53%] left-[52%] -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                      Products Not found
                    </div>
                    <img
                      src="/img/empty.png"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Shop;
