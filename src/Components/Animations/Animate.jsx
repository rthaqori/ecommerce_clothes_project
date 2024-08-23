import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Animate = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("to");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0 },
        }}
        initial="from"
        animate={mainControls}
        transition={{ duration: 1 }}
        {...props}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

export default Animate;
