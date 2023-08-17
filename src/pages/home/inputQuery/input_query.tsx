import React from "react";
import { useRouter } from "next/router";
import QueryCard from "../components/QueryCard";

const input_query = () => {

  return (
    <div className="mt-[8rem] h-full rounded-[1rem] bg-[#F9F9F9] mx-5 ">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl pl-10 pt-5 font-bold">Query Board</h1>
      </div>
      <QueryCard />
    </div>
  );
};

export default input_query;
