import { addPropertyControls, ControlType, useMotionValue } from "framer"
import { motion, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import React from "react"

const Dot = ({
    number,
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
    const imageWidth = useTransform(x, (value) => {
        if (!containerRef.current) return 0
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        // Calculate what width the image needs to be to maintain aspect ratio
        const heightBasedWidth = aspectRatio * viewportHeight
        return Math.max(heightBasedWidth, viewportWidth)
    })

    // Scale factor based on the original image dimensions (2172x918)
    const scaleFactor = useTransform(imageWidth, (width) => width / 2172)

    // Scale X position
    const scaledX = useTransform(
        [scaleFactor, x],
        ([sf, xVal]) => dotX * sf + xVal
    )

    // Scale Y position based on the actual displayed image height
    const scaledY = useTransform(scaleFactor, (sf) => {
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth

        // Calculate the actual height of the image as displayed
        const displayedImageWidth = Math.max(
            viewportWidth,
            aspectRatio * viewportHeight
        )
        const displayedImageHeight = displayedImageWidth / aspectRatio

        // Calculate the offset if the image is taller than the viewport
        const topOffset = (displayedImageHeight - viewportHeight) / 2

        // Scale the Y position relative to the actual image height
        return dotY * (displayedImageWidth / 2172) - topOffset
    })

    return (
        <motion.div
            style={{
                position: "absolute",
                left: scaledX,
                top: scaledY,
                zIndex: 10,
                pointerEvents: "auto",
                cursor: "pointer",
                // Only show the dot if it's within the viewport bounds
                opacity: useTransform(scaledY, (y) =>
                    y >= 0 && y <= window.innerHeight ? 1 : 0
                ),
                pointerEvents: useTransform(scaledY, (y) =>
                    y >= 0 && y <= window.innerHeight ? "auto" : "none"
                ),
            }}
            onHoverStart={() => setHoveredDot(number)}
            onHoverEnd={() => setHoveredDot(null)}
            onClick={(e) => {
                e.stopPropagation()
                window.location.href = linkUrl
            }}
        >
            <motion.div
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                }}
                animate={{
                    scale: hoveredDot === number ? 0 : [1, 1.2, 1],
                    opacity: hoveredDot === number ? 0 : [0.8, 1, 0.8],
                }}
                transition={{ duration: 0.3 }}
            />

            {hoveredDot === number && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: "absolute",
                        top: 5, // Center vertically on the 10px dot
                        left: 5, // Center horizontally on the 10px dot
                        transform: "translate(-50%, -50%)", // Center the bubble on the dot
                        backgroundColor: "white",
                        padding: "8px 16px",
                        borderRadius: 900,
                        fontFamily: "'TW Cen MT', sans-serif",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        minWidth: 120,
                        textAlign: "center",
                        zIndex: 100,
                    }}
                >
                    {hoverText}
                </motion.div>
            )}
        </motion.div>
    )
}

export default function DraggableBackground(props) {
    const aspectRatio = 2172 / 918
    const x = useMotionValue(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState({ left: 0, right: 0 })
    const [hoveredDot, setHoveredDot] = useState<number | null>(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const updateConstraints = () => {
            if (!containerRef.current) return
            const containerWidth = containerRef.current.offsetWidth
            const containerHeight = containerRef.current.offsetHeight
            const imageWidth = aspectRatio * containerHeight
            const overflow = imageWidth - containerWidth
            setConstraints({ left: -overflow, right: 0 })
        }

        const img = new Image()
        img.src = props.imageUrl
        img.onload = () => {
            updateConstraints()
            window.addEventListener("resize", updateConstraints)
        }

        return () => window.removeEventListener("resize", updateConstraints)
    }, [props.imageUrl])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <motion.div
                ref={imageRef}
                drag="x"
                style={{
                    x,
                    width: `max(100vw, ${aspectRatio * 100}vh)`,
                    height: "100vh",
                    backgroundImage: `url('${props.imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    touchAction: "none",
                }}
                dragConstraints={constraints}
                dragElastic={0}
                onClick={(e) => e.stopPropagation()}
            />

            {isClient &&
                Array.from({ length: 14 }, (_, i) => (
                    <Dot
                        key={i + 1}
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={i + 1}
                        x={x}
                        dotX={props[`dotX${i + 1}`]}
                        dotY={props[`dotY${i + 1}`]}
                        linkUrl={props[`linkUrl${i + 1}`]}
                        hoverText={props[`hoverText${i + 1}`]}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                ))}
        </div>
    )
}

const createControls = () => ({
    imageUrl: {
        type: ControlType.Image,
        title: "Background Image",
        defaultValue:
            "https://framerusercontent.com/images/3WI9aSR8RCmarxugtgEMKLJqk.jpg",
    },
    ...Array.from({ length: 14 }, (_, i) => i + 1).reduce(
        (acc, num) => ({
            ...acc,
            [`dotX${num}`]: {
                type: ControlType.Number,
                title: `Dot ${num} X`,
                defaultValue: 1500,
            },
            [`dotY${num}`]: {
                type: ControlType.Number,
                title: `Dot ${num} Y`,
                defaultValue: 135,
            },
            [`linkUrl${num}`]: {
                type: ControlType.String,
                title: `Dot ${num} Link`,
                defaultValue: "#",
            },
            [`hoverText${num}`]: {
                type: ControlType.String,
                title: `Dot ${num} Text`,
                defaultValue: `Point ${num}`,
            },
        }),
        {}
    ),
})

DraggableBackground.propertyControls = createControls()

// Required for Framer component catalog
DraggableBackground.title = "Draggable Background"
