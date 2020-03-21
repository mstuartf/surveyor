import React from "react";
import DraggableItem from "../DraggableItem/DraggableItem";
import { AnimatePresence, motion } from "framer-motion";
import { CardEntryDirection, variants } from "./variants";

interface Props {
  cardKey: string;
  direction: CardEntryDirection;
  nextCard: () => void;
  previousCard: () => void;
  children: React.ReactNode;
}

const DraggableStack = ({
  cardKey,
  direction,
  nextCard,
  previousCard,
  children
}: Props) => {
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
          key={cardKey}
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
