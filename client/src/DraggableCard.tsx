// snap into place if moved a little bit
// rotate as moved on x-axis
// swipe offscreen

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const DraggableCard = ({ children }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-45, 45]);

  let lastLeft = 0;

  const dragHandler = point => {
    lastLeft = point.x;
  };

  const dragEndHandler = () => {
    if (lastLeft >= 400) {
      console.log("right swipe", lastLeft);
    } else if (lastLeft <= -400) {
      console.log("left swipe", lastLeft);
    }
  };

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        x: x,
        rotate: rotate,
        cursor: "grab"
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.2}
      whileTap={{ cursor: "grabbing" }}
      onDrag={dragHandler}
      onDragEnd={dragEndHandler}
      children={children}
    />
  );
};
