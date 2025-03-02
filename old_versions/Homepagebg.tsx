import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

// ---------------------------
// 1) THE DOT CONFIGS ARRAY
// ---------------------------
const dotConfigs = [
    {
        key: "2025poster",
        x: 1500,
        y: 135,
        link: "#",
        text: "2025 Poster",
        isVisible: true,
    },
    {
        key: "2025calendar",
        x: 1150,
        y: 350,
        link: "#",
        text: "2025 Calendar",
        isVisible: true,
    },
    { key: "elva", x: 950, y: 175, link: "#", text: "Elva", isVisible: true },
    {
        key: "computer",
        x: 1100,
        y: 700,
        link: "#",
        text: "Computer",
        isVisible: true,
    },
    {
        key: "bryanphoto",
        x: 364,
        y: 140,
        link: "#",
        text: "Bryan Photo",
        isVisible: true,
    },
    { key: "books", x: 777, y: 584, link: "#", text: "Books", isVisible: true },
    {
        key: "headphones",
        x: 458,
        y: 588,
        link: "#",
        text: "Headphones",
        isVisible: true,
    },
    {
        key: "bookshelf",
        x: 129,
        y: 400,
        link: "#",
        text: "Bookshelf",
        isVisible: true,
    },
    {
        key: "soccerball",
        x: 450,
        y: 750,
        link: "#",
        text: "Soccer Ball",
        isVisible: true,
    },
    {
        key: "phone",
        x: 1700,
        y: 800,
        link: "#",
        text: "Phone",
        isVisible: true,
    },
    {
        key: "hoodie",
        x: 1400,
        y: 600,
        link: "#",
        text: "Hoodie",
        isVisible: true,
    },
    { key: "mic", x: 1025, y: 500, link: "#", text: "Mic", isVisible: true },
    {
        key: "archerandcarver",
        x: 1800,
        y: 120,
        link: "#",
        text: "Archer and Carver",
        isVisible: true,
    },
]

// ---------------------------
// 2) DOT COMPONENT
// ---------------------------
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
    const [localViewportHeight, setLocalViewportHeight] = useState(
        typeof window !== "undefined" ? window.innerHeight : 0
    )

    useEffect(() => {
        const updateHeight = () => {
            setLocalViewportHeight(window.innerHeight)
        }
        const handleOrientationChange = () => {
            // Slight delay so orientation can settle
            setTimeout(updateHeight, 100)
        }

        window.addEventListener("resize", updateHeight)
        window.addEventListener("orientationchange", handleOrientationChange)

        return () => {
            window.removeEventListener("resize", updateHeight)
            window.removeEventListener(
                "orientationchange",
                handleOrientationChange
            )
        }
    }, [])

    // Calculate the displayed image's width based on viewport height
    const imageWidth = useTransform(x, () => {
        if (!containerRef.current) return 0
        const heightBasedWidth = aspectRatio * localViewportHeight
        return Math.max(heightBasedWidth, window.innerWidth)
    })

    // Scale factor relative to the original width (2172)
    const scaleFactor = useTransform(imageWidth, (width) => width / 2172)

    // Adjust dot X
    const scaledX = useTransform([scaleFactor, x], ([sf, xVal]) => {
        const touchOffset = "ontouchstart" in window ? 50 : 0
        return dotX * sf + xVal + touchOffset
    })

    // Adjust dot Y (centered vertically)
    const scaledY = useTransform(scaleFactor, (sf) => {
        const displayedImageWidth = Math.max(
            window.innerWidth,
            aspectRatio * localViewportHeight
        )
        const displayedImageHeight = displayedImageWidth / aspectRatio
        const topOffset = (displayedImageHeight - localViewportHeight) / 2
        return dotY * (displayedImageWidth / 2172) - topOffset
    })

    const handleInteraction = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (hoveredDot === number) {
            window.location.href = linkUrl
        } else {
            setHoveredDot(number)
        }
    }

    return (
        <motion.div
            style={{
                position: "absolute",
                left: scaledX,
                top: scaledY,
                zIndex: 10,
                cursor: "pointer",
                padding: "10px",
                margin: "-10px",
                opacity: useTransform(scaledY, (y) =>
                    y >= 0 && y <= localViewportHeight ? 1 : 0
                ),
                pointerEvents: useTransform(scaledY, (y) =>
                    y >= 0 && y <= localViewportHeight ? "auto" : "none"
                ),
            }}
            onClick={handleInteraction}
            onHoverStart={() => {
                if (!("ontouchstart" in window)) {
                    setHoveredDot(number)
                }
            }}
            onHoverEnd={() => {
                if (!("ontouchstart" in window)) {
                    setHoveredDot(null)
                }
            }}
        >
            <motion.div
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor:
                        hoveredDot === number
                            ? "rgba(255,255,255,1)"
                            : "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    boxShadow:
                        hoveredDot === number
                            ? "0 0 30px rgba(255,255,255,0.7)"
                            : "0 0 20px rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                }}
                animate={{
                    scale: hoveredDot === number ? 1.2 : [1, 1.2, 1],
                    opacity: hoveredDot === number ? 1 : [0.8, 1, 0.8],
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

            {hoveredDot === number && (
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
    )
}

// ---------------------------
// 3) DRAGGABLE BACKGROUND
// ---------------------------
export default function DraggableBackground() {
    const aspectRatio = 2172 / 918
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const containerRef = useRef(null)
    const imageRef = useRef(null)
    const [constraints, setConstraints] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    })
    const [hoveredDot, setHoveredDot] = useState(null)
    const [isClient, setIsClient] = useState(false)
    const [viewportHeight, setViewportHeight] = useState(0)

    const updateViewportHeight = () => {
        const vh = window.innerHeight
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        setViewportHeight(vh)
    }

    useEffect(() => {
        setIsClient(true)
        updateViewportHeight()

        const updateConstraints = () => {
            if (!containerRef.current) return
            const containerWidth = window.innerWidth
            const containerHeight = viewportHeight || window.innerHeight
            // Image's width for cover-like logic
            const imageWidth = Math.max(
                containerWidth,
                aspectRatio * containerHeight
            )
            const overflow = imageWidth - containerWidth
            setConstraints({ left: -overflow, right: 0, top: 0, bottom: 0 })
        }

        // Preload the background image (modify URL as needed)
        const img = new Image()
        // For this demo, you could hardcode or param-ify it:
        // img.src = "https://framerusercontent.com/images/..."
        // Or set it to a local image if you prefer
        img.src =
            "https://framerusercontent.com/images/3WI9aSR8RCmarxugtgEMKLJqk.jpg"

        img.onload = () => {
            updateConstraints()
        }

        const handleResize = () => {
            updateViewportHeight()
            updateConstraints()
        }
        const handleOrientationChange = () => {
            setTimeout(() => {
                updateViewportHeight()
                updateConstraints()
            }, 100)
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("orientationchange", handleOrientationChange)

        // Prevent overscroll on mobile
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
        document.body.style.height = "100%"

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener(
                "orientationchange",
                handleOrientationChange
            )

            // Cleanup
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
            document.body.style.position = ""
            document.body.style.width = ""
            document.body.style.height = ""
        }
    }, [viewportHeight])

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
                    backgroundImage: `url('https://framerusercontent.com/images/3WI9aSR8RCmarxugtgEMKLJqk.jpg')`,
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
                        imageRef.current.style.cursor = "grabbing"
                    }
                }}
                onDragEnd={() => {
                    if (imageRef.current) {
                        imageRef.current.style.cursor = "grab"
                    }
                }}
                whileTap={{ cursor: "grabbing" }}
            />

            {/* Render dots from dotConfigs, using code-only definitions */}
            {isClient &&
                dotConfigs.map((dot, index) => {
                    if (!dot.isVisible) return null
                    return (
                        <Dot
                            key={dot.key}
                            containerRef={containerRef}
                            aspectRatio={aspectRatio}
                            number={index + 1}
                            x={x}
                            dotX={dot.x}
                            dotY={dot.y}
                            linkUrl={dot.link}
                            hoverText={dot.text}
                            hoveredDot={hoveredDot}
                            setHoveredDot={setHoveredDot}
                        />
                    )
                })}
        </div>
    )
}
