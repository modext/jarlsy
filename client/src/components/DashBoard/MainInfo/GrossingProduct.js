import React from "react";

import { useHistory } from "react-router-dom";

function GrossingProduct({ grossingProduct }) {
  const history = useHistory();
  function shortenTitle(title) {
    if (title.length > 31) {
      return `${title.substr(0, 32)}..`.toLowerCase();
    }
    return title.toLowerCase();
  }
  return (
    <div className="bg-white relative flex-1 p-small rounded-md shadow-sm_dark">
      <h3 className="font-medium text-lg">Top Grossing Products</h3>
      {grossingProduct.length > 0 ? (
        <div className="flex flex-col h-[95%] justify-between">
          <div>
            {grossingProduct.map((product, key) => {
              return (
                <div
                  key={key}
                  className="flex cursor-pointer items-center space-x-2 duration-300 rounded-md transition-all hover:bg-[#f5f5f5] mt-2 p-1.5"
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden">
                    <img
                      src={product.productImg[0]}
                      className="w-full bg-gray-100 h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div className="font-normal">
                      <div className="font-normal text-sm capitalize">
                        {shortenTitle(product.title)}
                      </div>
                      <div className="text-xs text-[#4e4e4e] capitalize">
                        {product.category}
                      </div>
                    </div>
                    <div className="font-semibold text-sm">
                      ${product.prize}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              history.push("/admin/products");
            }}
            className="border-2 hover:border-black transition-all duration-300 block w-full font-bold rounded-md text-small mt-2 p-2"
          >
            All Products
          </button>
        </div>
      ) : (
        <div className="flex absolute font-medium text-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="text-[#FF385C]">No Products found</div>
        </div>
      )}
    </div>
  );
}

export default GrossingProduct;
