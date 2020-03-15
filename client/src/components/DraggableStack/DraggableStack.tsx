import React from "react";
import DraggableItem from "../DraggableItem/DraggableItem";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "./variants";

const DraggableStack = ({
  val,
  direction,
  nextCard,
  previousCard,
  children
}) => {
  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        <motion.div
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute"
          }}
          key={val}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 }
          }}
        >
          <DraggableItem onDraggedRight={previousCard} onDraggedLeft={nextCard}>
            {children}
          </DraggableItem>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DraggableStack;
