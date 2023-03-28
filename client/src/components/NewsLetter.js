import React, { useState } from "react";

function NewsLetter() {
  const [email, setEmail] = useState("");
  return (
    <div className="m-auto mt-16 text-center">
      <h3 className="font-normal capitalize text-lg">
        Receive exclusive promotions, private sales and news
      </h3>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email);
        }}
        className="mt-4 ml-2"
      >
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          className="w-4/12 p-3 border-gray-300 border-2 focus:outline-none rounded-md"
          placeholder="Enter Your Email Address"
        />
        <button className="bg-[#FF385C] -ml-1.5 text-lg rounded-md py-3 px-10 font-bold text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
