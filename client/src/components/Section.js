import { useHistory } from "react-router-dom";

export default function Section() {
  const history = useHistory();
  return (
    <div className="flex  max-h-[650px]">
      <div
        onClick={() => {
          history.push("/shop/mens/clothing/all-clothing");
        }}
        className="w-1/2 group overflow-hidden relative cursor-pointer"
      >
        <img
          src="/img/menSec.webp"
          className="w-full h-full object-cover object-right-top group-hover:scale-101 transition-all duration-200"
          alt=""
        />
        <div className="bg-black top-0  left-0 opacity-20 absolute w-full h-full"></div>
        <div className="font-bold bg-[#FF385C] text-white absolute top-1/2 left-1/2 py-2 -translate-x-1/2 -translate-y-1/2   px-5 text-xl lg:text-3xl uppercase -rotate-2">
          <span className="inline-block rotate-2">Shop Men</span>
        </div>
      </div>
      <div
        onClick={() => {
          history.push("/shop/kids/clothing/all-clothing");
        }}
        className="w-1/2 group relative overflow-hidden  cursor-pointer"
      >
        <img
          src="/img/kidssec.webp"
          className="w-full h-full object-cover object-right-top  group-hover:scale-101 transition-all duration-200"
          alt=""
        />
        <div className="bg-black top-0 left-0 opacity-20 absolute w-full h-full"></div>
        <div className="font-bold bg-[#FF385C] text-white absolute top-1/2 left-1/2 py-2 -translate-x-1/2 -translate-y-1/2   px-5 text-xl lg:text-3xl uppercase -rotate-2">
          <span className="inline-block rotate-2">Shop Kids</span>
        </div>
      </div>
    </div>
  );
}
