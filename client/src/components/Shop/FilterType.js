import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { ReactComponent as Dropdown } from "../../icons/dropdown.svg";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Elements from "./Elements";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function FilterType({ type, selectedVals, getSelectedVals, getPrice }) {
  const [dropdown, setDropdown] = useState(false);
  const [showMore, setShowMore] = useState(false);
  let show = useRef(false);

  function modifyVals(value) {
    getSelectedVals({ value, type: type.type });
  }

  function valueFilter(categoryIncluded, selected) {
    if (categoryIncluded) {
      return type.dropdownItems.filter((elem) => {
        let found = selected && selected.find((el) => el.value === elem.name);
        return Array.isArray(elem[type.type.toLowerCase()]) && found;
      });
    }
    return type.dropdownItems.filter((el) => {
      return Array.isArray(el[type.type.toLowerCase()]);
    });
  }

  function expandDeepDropdown(selected) {
    if (type.type !== "Style" && type.type !== "Pattern") {
      return type.dropdownItems;
    }
    let categoryIncluded =
      selected && selected.find((el) => el.type === "Category");
    let dropItems = valueFilter(categoryIncluded, selected)
      .map((el) => {
        let elements = el[type.type.toLowerCase()];
        return [...elements];
      })
      .flat()
      .map((el) => {
        return { ...el, element: el.element.toLowerCase() };
      });
    let modifiedDropItems = dropItems.filter((item, idx, array) => {
      return idx === array.findIndex((el) => el.element === item.element);
    });
    if (modifiedDropItems.length > 12) {
      show.current = true;
    }
    return modifiedDropItems.length > 12 && !showMore
      ? modifiedDropItems.slice(0, 13)
      : modifiedDropItems;
  }

  return (
    <div className="py-3 border-b-[1px] border-[#0000002f]">
      <div
        onClick={() => {
          setDropdown((prev) => {
            return !prev;
          });
        }}
        className="flex  justify-between cursor-pointer items-center"
      >
        <div className="text-md font-medium">{type.type}</div>
        <div>
          <Dropdown className="w-2.5 h-2.5"></Dropdown>
        </div>
      </div>
      <div
        className={`mt-1.5 ${
          dropdown ? "visible h-auto opacity-100" : "hidden opacity-0 h-0"
        }`}
      >
        {Array.isArray(type.dropdownItems) ? (
          expandDeepDropdown(selectedVals.length <= 0 ? "" : selectedVals).map(
            (elem) => {
              return (
                <Elements
                  key={elem.id}
                  type={type.type}
                  selectedVals={selectedVals}
                  notifyParent={modifyVals}
                >
                  {elem.element}
                </Elements>
              );
            }
          )
        ) : (
          <div className="w-11/12">
            <Range
              color="red"
              min={5}
              max={200}
              defaultValue={[5, 40]}
              onChange={getPrice}
              allowCross={false}
              tipFormatter={(value) => (
                <span className="tooltip p-1">${value}</span>
              )}
              step={15}
            />
            <div className="flex mt-1 font-medium text-black text-sm justify-between">
              <span className="relative right-2">$5</span>
              <span className="relative left-4">$200</span>
            </div>
          </div>
        )}
        {dropdown && show.current && (
          <div
            onClick={() => {
              setShowMore((prev) => {
                return !prev;
              });
            }}
            className="cursor-pointer transition-all duration-200 hover:text-[#ff1a44] text-[#FF385C] flex items-center py-[4px] font-medium text-sm"
          >
            {!showMore ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />}
            <span>{!showMore ? "Show More" : "Show Less"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterType;
