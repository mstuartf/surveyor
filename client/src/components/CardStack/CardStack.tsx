import React from "react";
import DraggableCard from "../DraggableCard/DraggableCard";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "./variants";

const CardStack = ({ val, direction, nextCard, previousCard, children }) => {
  return (
    <>
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
          <DraggableCard onDraggedRight={previousCard} onDraggedLeft={nextCard}>
            {children}
          </DraggableCard>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CardStack;
