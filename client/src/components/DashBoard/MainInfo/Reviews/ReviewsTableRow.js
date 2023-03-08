import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Info from "../Info";
import Review from "../Review";

function ReviewsTableRow({
  tableData,
  setEngagement,
  setReply,
  setDelete,
  type
}) {
  function setDeleteIdx(full) {
    setDelete(tableData.id, full);
  }

  return (
    <div className="relative group">
      <div className="absolute top-0 flex items-center justify-end p-4  z-0 left-0  right-0 bg-gray-50 w-full h-full">
        <div
          onClick={() => {
            setDeleteIdx(true);
          }}
        >
          <RiDeleteBin6Fill className="w-5 h-5 text-[#ff385dd3] fill-current cursor-pointer"></RiDeleteBin6Fill>
        </div>
      </div>
      <div className="flex relative z-20 bg-white transition-all duration-200 group-hover:shadow-sm_dark  group-hover:bg-gray-50 space-x-14 rounded-md cursor-pointer p-3 space-between w-full  group-hover:w-[95%]">
        <div type={type} className="flex-1">
          <Review
            data={tableData}
            setReply={setReply}
            setDelete={setDeleteIdx}
            setEngagement={setEngagement}
          ></Review>
        </div>
        <div className="flex w-[30%] items-center">
          <div className="">
            <div className="flex space-x-3  duration-300 rounded-md ">
              <div className="w-14 h-14 rounded-md overflow-hidden">
                <img
                  src={tableData.product.img}
                  className="w-full h-full bg-gray-100 object-cover"
                  alt=""
                />
              </div>
              <div className="flex flex-shrink-0 flex-1 items-center justify-between">
                <div className="font-normal">
                  <div className="font-normal text-sm  capitalize">
                    {tableData.product.name}
                  </div>
                  <div className="text-xs  text-[#727272] capitalize">
                    {tableData.product.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsTableRow;
