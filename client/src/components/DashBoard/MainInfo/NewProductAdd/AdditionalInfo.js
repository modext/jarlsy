import React from "react";
import DropDown from "./DropDown";
import Input from "./Input";

function AdditionalInfo({ getAllValues, values, def }) {
  return (
    <div className="mt-4">
      <div className="flex space-x-3">
        <div className="w-full">
          <label htmlFor="colour" className="font-medium text-small">
            Colour
          </label>
          <Input
            value={values.colour}
            placeholder="Colour"
            getAllValues={getAllValues}
            id="colour"
          ></Input>
        </div>
        <div>
          <label htmlFor="inStock" className="font-medium text-small">
            In Stock
          </label>
          <div className="w-32">
            <Input
              value={values.inStock}
              getAllValues={getAllValues}
              type="Number"
              placeholder="In Stock"
              id="inStock"
            ></Input>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="prize" className="font-medium text-small">
          Prize
        </label>
        <div className="flex space-x-3">
          <Input
            value={values.prize}
            type="Number"
            getAllValues={getAllValues}
            placeholder="Prize"
            id="prize"
          ></Input>
          <div className="">
            <DropDown
              def={def}
              title="currency"
              getAllValues={getAllValues}
              dropdownList={["USD", "EUR", "GBP", "INR"]}
            ></DropDown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
