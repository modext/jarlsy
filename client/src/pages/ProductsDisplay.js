import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import ImageBox from "../components/ProductDisplay/ImageBox";
import ProductDesc from "../components/ProductDisplay/ProductDesc";
import ProductRecomm from "../components/ProductDisplay/ProductRecomm";
import RatingSection from "../components/ProductDisplay/RatingSection";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function ProductsDisplay() {
  let { brand, name, id } = useParams();
  const [product, setProduct] = useState("");
  const [loader, setLoader] = useState(true);
  const [err, setErr] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [recently, setRecent] = useState([]);
  useEffect(() => {
    let recentlyViewed = localStorage.getItem("recentlyViewed");
    recentlyViewed &&
      setRecent(
        JSON.parse(recentlyViewed)
          .filter((el) => el.id !== id)
          .reverse()
      );
  }, [id]);
  useEffect(() => {
    async function findDocument() {
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
        let product = [];
        response.forEach((elem, idx1) => {
          elem.docs.forEach((doc, idx2) => {
            if (doc.id === responseRev[idx1].docs[idx2].id) {
              product.push({
                id: doc.id,
                ...doc.data(),
                ...responseRev[idx1].docs[idx2].data()
              });
            }
          });
        });
        let [foundProduct] = product.filter((pr) => pr.id === id);

        if (!foundProduct) {
          throw new Error("Product Not Found");
        }
        let recommendations = product.filter(
          (recomm) =>
            recomm.brand === foundProduct.brand && foundProduct.id !== recomm.id
        );

        let docData = await getDoc(doc(db, "users", foundProduct.adminId));
        if (user) {
          let visitors = docData.data().visitors;
          if (!visitors.find((item) => item.id === user.uid)) {
            await updateDoc(doc(db, "users", foundProduct.adminId), {
              visitors: arrayUnion({ id: user.uid, timestamp: new Date() })
            });
          }
        }

        setRecommendations(recommendations);
        setProduct(foundProduct);

        setLoader(false);
      } catch (err) {
        setErr(err.message);
        setLoader(false);
      }
    }
    id && findDocument();
  }, [id, user]);

  return (
    <>
      {loader && (
        <div className="fixed w-full  top-0 h-full z-50 bg-[#000000cc]"></div>
      )}
      <div>
        {err && (
          <div className="h-[90vh] max-w-screen-2xl m-auto">
            <div className="w-[35%] relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
              <div className="text-center absolute top-[53%] left-[52%] -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                {err}
              </div>
              <img
                src="/img/empty.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        )}
        {product && (
          <>
            <div className="px-11">
              <div className="flex py-8 space-x-12">
                <ImageBox product={product}></ImageBox>
                <ProductDesc product={product}></ProductDesc>
              </div>
            </div>

            <div className="px-11 space-y-24  mt-20">
              <ProductRecomm
                title={"YOU MIGHT ALSO LIKE"}
                products={recommendations}
              ></ProductRecomm>
              <RatingSection reviews={product.reviews}></RatingSection>
              {recently.length > 0 && (
                <ProductRecomm
                  title={"Recently Viewed"}
                  products={recently}
                ></ProductRecomm>
              )}
            </div>
            <Footer></Footer>
          </>
        )}
      </div>
    </>
  );
}

export default ProductsDisplay;
