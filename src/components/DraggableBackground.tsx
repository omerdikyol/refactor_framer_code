import { addPropertyControls, ControlType } from "framer";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Dot from "./Dot";
import dotConfigs from "./dotConfigs";

/**
 * DraggableBackground - A Framer code component that renders a draggable background with interactive dots
 * 
 * Features:
 * - Horizontally draggable background image
 * - Interactive dots with hover/tap tooltips
 * - Responsive layout that adapts to different screen sizes
 * - Customizable dot positions, links, and tooltip text
 */
export default function DraggableBackground(props: any) {
  // Constants and state
  const aspectRatio = 2172 / 918; // Background image aspect ratio
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({
    left: 0,
    right: 0,
  });
  const [hoveredDot, setHoveredDot] = useState<number | string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Function to update viewport height
  const updateViewportHeight = () => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    setViewportHeight(vh);
  };

  useEffect(() => {
    setIsClient(true);
    // Initial viewport height setup
    updateViewportHeight();

    const updateConstraints = () => {
      if (!containerRef.current) return;
      const containerWidth = window.innerWidth;
      const containerHeight = viewportHeight || window.innerHeight;
      const imageWidth = Math.max(
        containerWidth,
        aspectRatio * containerHeight
      );
      const overflow = imageWidth - containerWidth;
      setConstraints({ left: -overflow, right: 0 });
    };

    const img = new Image();
    img.src = props.imageUrl;
    img.onload = () => {
      updateConstraints();
    };

    // Event listeners for viewport changes
    window.addEventListener("resize", () => {
      updateViewportHeight();
      updateConstraints();
    });
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        updateViewportHeight();
        updateConstraints();
      }, 100);
    });

    // Prevent overscroll behavior
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      window.removeEventListener("resize", updateConstraints);
      window.removeEventListener("orientationchange", updateConstraints);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [props.imageUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: viewportHeight ? `${viewportHeight}px` : "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        touchAction: "none",
        WebkitOverflowScrolling: "touch",
        background: "#000",
      }}
    >
      <motion.div
        ref={imageRef}
        drag="x"
        style={{
          x,
          width: `max(100vw, ${aspectRatio * 100}vh)`,
          height: viewportHeight ? `${viewportHeight}px` : "100vh",
          backgroundImage: `url('${props.imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          cursor: "grab",
        }}
        dragConstraints={constraints}
        dragElastic={0}
        onClick={(e) => e.stopPropagation()}
        onDragStart={() => {
          if (imageRef.current) {
            imageRef.current.style.cursor = "grabbing";
          }
        }}
        onDragEnd={() => {
          if (imageRef.current) {
            imageRef.current.style.cursor = "grab";
          }
        }}
        whileTap={{ cursor: "grabbing" }}
      />

      {isClient && (
        <>
          {dotConfigs.map((config) => (
            <Dot
              key={config.id}
              id={config.number}
              containerRef={containerRef}
              aspectRatio={aspectRatio}
              x={x}
              dotX={config.dotX}
              dotY={config.dotY}
              targetURL={props[config.linkProp] || config.defaultLink}
              hoverText={props[config.textProp] || config.defaultText}
              hoveredDot={hoveredDot}
              setHoveredDot={setHoveredDot}
              isVisible={config.visibleProp ? props[config.visibleProp] : config.defaultVisible !== false}
              isNewWindow={config.newWindowProp ? props[config.newWindowProp] : config.defaultNewWindow === true}
            />
          ))}
        </>
      )}
    </div>
  );
}

/**
 * Create property controls for the Framer component
 * 
 * This function generates property controls for:
 * - The background image
 * - Each dot's link URL and tooltip text
 */
const createControls = () => {
  const controls: any = {
    imageUrl: {
      type: ControlType.Image,
      title: "Background Image",
      defaultValue:
        "https://framerusercontent.com/images/3WI9aSR8RCmarxugtgEMKLJqk.jpg",
    },
  };

  // Add controls for each dot configuration
  dotConfigs.forEach((config) => {
    controls[config.linkProp] = {
      type: ControlType.String,
      title: `${config.defaultText} Link`,
      defaultValue: config.defaultLink,
    };

    controls[config.textProp] = {
      type: ControlType.String,
      title: `${config.defaultText} Text`,
      defaultValue: config.defaultText,
    };
    
    if (config.visibleProp) {
      controls[config.visibleProp] = {
        type: ControlType.Boolean,
        title: `${config.defaultText} Visible`,
        defaultValue: config.defaultVisible !== false,
      };
    }
    
    if (config.newWindowProp) {
      controls[config.newWindowProp] = {
        type: ControlType.Boolean,
        title: `${config.defaultText} New Window`,
        defaultValue: config.defaultNewWindow === true,
      };
    }
  });

  return controls;
};

// Add property controls to the component
DraggableBackground.propertyControls = createControls();

// Required for Framer component catalog
DraggableBackground.title = "Draggable Background";
