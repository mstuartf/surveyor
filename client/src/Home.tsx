import React, { useState } from "react";
import CardStack from "./components/CardStack/CardStack";

const Home = () => {
  const [[val, direction], setPage] = useState([0, 0]);

  const paginate = (direction: number) => {
    setPage([val + direction, -direction]);
  };

  return (
    <div className="border border-dashed border-gray-300 rounded overflow-hidden p-8 w-full max-w-lg h-full max-h-2xl m-auto mt-16">
      <div className="w-full h-full relative">
        <CardStack
          val={val}
          direction={direction}
          nextCard={() => paginate(1)}
          previousCard={() => paginate(-1)}
        >
          <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
            {val}
          </div>
        </CardStack>
      </div>
    </div>
  );
};

export default Home;
