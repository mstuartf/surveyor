import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { swipePower, swipeConfidenceThreshold } from "./swipePower";

const DraggableCard = ({ children, onDraggedLeft, onDraggedRight }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-45, 45]);

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      onDraggedLeft(-1);
    } else if (swipe > swipeConfidenceThreshold) {
      onDraggedRight(1);
    }
  };

  return (
    <motion.div
      style={{
        x: x,
        rotate: rotate,
        cursor: "grab",
        width: "100%",
        height: "100%"
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.2}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={onDragEnd}
      children={children}
    />
  );
};

export default DraggableCard;
