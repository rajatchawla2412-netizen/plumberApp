/**
 * Centralized Framer Motion animation variants for SFA application
 */

// Generic backdrop/overlay fade transition
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Bottom sheet slide up transition
export const bottomSheetVariants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" }
};

// Center modal dialog scale & fade transition
export const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};

// Horizontal multi-step slide transitions based on custom direction value
// dir > 0: forward transition, dir < 0: backward transition
export const stepVariants = {
  initial: (dir) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1
  },
  exit: (dir) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0
  })
};

// Horizontal input shake for alerts/errors
export const shakeVariants = {
  shake: {
    x: [-6, 6, -6, 6, 0],
    transition: { duration: 0.35, ease: "easeInOut" }
  },
  idle: { x: 0 }
};

// Page wrapper stagger children transition wrapper
export const staggerContainerVariants = (staggerDelay = 0.08) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay
    }
  }
});

// Individual block fade-and-slide up animation (used inside staggered parent)
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 220
    }
  }
};
