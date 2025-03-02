import React, { useEffect, useState, useRef } from "react";
import { motion, MotionValue } from "framer-motion";

/**
 * Props for the Dot component
 */
export interface DotProps {
  /** Unique identifier for the dot */
  id: string | number;
  /** X position value from the parent component */
  x: MotionValue<number>;
  /** X coordinate on the background image */
  dotX: number;
  /** Y coordinate on the background image */
  dotY: number;
  /** URL to navigate to when dot is clicked */
  linkUrl: string;
  /** Text to display in the tooltip */
  hoverText: string;
  /** Currently hovered dot ID */
  hoveredDot: string | number | null;
  /** Function to set the currently hovered dot */
  setHoveredDot: (dot: string | number | null) => void;
  /** Aspect ratio of the background image */
  aspectRatio: number;
  /** Reference to the container element */
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Dot component - Renders an interactive dot on the background
 * 
 * Each dot displays a tooltip on hover/tap and navigates to a URL on click/second tap
 */
const Dot: React.FC<DotProps> = ({
  id,
  x,
  dotX,
  dotY,
  linkUrl,
  hoverText,
  hoveredDot,
  setHoveredDot,
  aspectRatio,
  containerRef,
}) => {
  // Use refs to store DOM measurements
  const dotRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [localViewportHeight, setLocalViewportHeight] = useState(window.innerHeight);
  
  // Update position when x motion value changes or on resize
  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const imageHeight = containerHeight;
      const imageWidth = Math.max(containerWidth, aspectRatio * imageHeight);
      
      // Calculate scale factor
      const scaleFactor = imageWidth / 2172;
      
      // Get current x offset from motion value
      const xOffset = x.get();
      
      // Calculate dot position
      const dotXPos = dotX * scaleFactor + xOffset;
      const dotYPos = dotY * scaleFactor;
      
      setPosition({ x: dotXPos, y: dotYPos });
    };
    
    // Initial position calculation
    updatePosition();
    
    // Subscribe to x motion value changes
    const unsubscribeX = x.onChange(updatePosition);
    
    // Handle window resize
    const handleResize = () => {
      setLocalViewportHeight(window.innerHeight);
      updatePosition();
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 100);
    });
    
    return () => {
      unsubscribeX();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [x, dotX, dotY, aspectRatio, containerRef]);

  // Handle click/tap interaction
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hoveredDot === id) {
      window.location.href = linkUrl;
    } else {
      setHoveredDot(id);
    }
  };

  return (
    <motion.div
      ref={dotRef}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 10,
        cursor: "pointer",
        padding: "10px",
        margin: "-10px",
        opacity: position.y >= 0 && position.y <= localViewportHeight ? 1 : 0,
        pointerEvents: position.y >= 0 && position.y <= localViewportHeight ? "auto" : "none",
      }}
      onClick={handleInteraction}
      onHoverStart={() => !("ontouchstart" in window) && setHoveredDot(id)}
      onHoverEnd={() => !("ontouchstart" in window) && setHoveredDot(null)}
    >
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor:
            hoveredDot === id
              ? "rgba(255,255,255,1)"
              : "rgba(255,255,255,0.8)",
          cursor: "pointer",
          boxShadow:
            hoveredDot === id
              ? "0 0 30px rgba(255,255,255,0.7)"
              : "0 0 20px rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        animate={{
          scale: hoveredDot === id ? 1.2 : [1, 1.2, 1],
          opacity: hoveredDot === id ? 1 : [0.8, 1, 0.8],
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        />
      </motion.div>

      {hoveredDot === id && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: 25,
            left: 10,
            transform: "translate(-50%, 0)",
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: "12px 20px",
            borderRadius: 900,
            fontFamily: "'TW Cen MT', sans-serif",
            fontSize: 16,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            minWidth: 140,
            textAlign: "center",
            zIndex: 100,
            color: "#000",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          <div>{hoverText}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dot;
