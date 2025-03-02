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
    const [localViewportHeight, setLocalViewportHeight] = useState(
        window.innerHeight
    )

    useEffect(() => {
        const updateHeight = () => {
            setLocalViewportHeight(window.innerHeight)
        }
        window.addEventListener("resize", updateHeight)
        window.addEventListener("orientationchange", () => {
            setTimeout(updateHeight, 100)
        })
        return () => {
            window.removeEventListener("resize", updateHeight)
            window.removeEventListener("orientationchange", updateHeight)
        }
    }, [])

    const imageWidth = useTransform(x, (value) => {
        if (!containerRef.current) return 0
        const heightBasedWidth = aspectRatio * localViewportHeight
        return Math.max(heightBasedWidth, window.innerWidth)
    })

    const scaleFactor = useTransform(imageWidth, (width) => width / 2172)

    const scaledX = useTransform(
        [scaleFactor, x],
        ([sf, xVal]) => dotX * sf + xVal + ("ontouchstart" in window ? 50 : 0)
    )

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
            onHoverStart={() =>
                !("ontouchstart" in window) && setHoveredDot(number)
            }
            onHoverEnd={() =>
                !("ontouchstart" in window) && setHoveredDot(null)
            }
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

const createControls = () => ({
    imageUrl: {
        type: ControlType.Image,
        title: "Background Image",
        defaultValue:
            "https://framerusercontent.com/images/3WI9aSR8RCmarxugtgEMKLJqk.jpg",
    },
    link2025Poster: {
        type: ControlType.String,
        title: "2025 Poster Link",
        defaultValue: "#",
    },
    text2025Poster: {
        type: ControlType.String,
        title: "2025 Poster Text",
        defaultValue: "2025 Poster",
    },
    link2025Calendar: {
        type: ControlType.String,
        title: "2025 Calendar Link",
        defaultValue: "#",
    },
    text2025Calendar: {
        type: ControlType.String,
        title: "2025 Calendar Text",
        defaultValue: "2025 Calendar",
    },
    linkElva: {
        type: ControlType.String,
        title: "Elva Link",
        defaultValue: "#",
    },
    textElva: {
        type: ControlType.String,
        title: "Elva Text",
        defaultValue: "Elva",
    },
    linkComputer: {
        type: ControlType.String,
        title: "Computer Link",
        defaultValue: "#",
    },
    textComputer: {
        type: ControlType.String,
        title: "Computer Text",
        defaultValue: "Computer",
    },
    linkBryanPhoto: {
        type: ControlType.String,
        title: "Bryan Photo Link",
        defaultValue: "#",
    },
    textBryanPhoto: {
        type: ControlType.String,
        title: "Bryan Photo Text",
        defaultValue: "Bryan Photo",
    },
    linkBooks: {
        type: ControlType.String,
        title: "Books Link",
        defaultValue: "#",
    },
    textBooks: {
        type: ControlType.String,
        title: "Books Text",
        defaultValue: "Books",
    },
    linkHeadphones: {
        type: ControlType.String,
        title: "Headphones Link",
        defaultValue: "#",
    },
    textHeadphones: {
        type: ControlType.String,
        title: "Headphones Text",
        defaultValue: "Headphones",
    },
    linkBookshelf: {
        type: ControlType.String,
        title: "Bookshelf Link",
        defaultValue: "#",
    },
    textBookshelf: {
        type: ControlType.String,
        title: "Bookshelf Text",
        defaultValue: "Bookshelf",
    },
    linkPhone: {
        type: ControlType.String,
        title: "Phone Link",
        defaultValue: "#",
    },
    textPhone: {
        type: ControlType.String,
        title: "Phone Text",
        defaultValue: "Phone",
    },
    linkHoodie: {
        type: ControlType.String,
        title: "Hoodie Link",
        defaultValue: "#",
    },
    textHoodie: {
        type: ControlType.String,
        title: "Hoodie Text",
        defaultValue: "Hoodie",
    },
    linkMic: {
        type: ControlType.String,
        title: "Mic Link",
        defaultValue: "#",
    },
    textMic: {
        type: ControlType.String,
        title: "Mic Text",
        defaultValue: "Mic",
    },
    linkPolaroids: {
        type: ControlType.String,
        title: "Polaroids Link",
        defaultValue: "#",
    },
    textPolaroids: {
        type: ControlType.String,
        title: "Polaroids Text",
        defaultValue: "Polaroids",
    },
    linkScholarship: {
        type: ControlType.String,
        title: "Scholarship Link",
        defaultValue: "#",
    },
    textScholarship: {
        type: ControlType.String,
        title: "Scholarship Text",
        defaultValue: "Scholarship",
    },
})

DraggableBackground.propertyControls = createControls()

export default function DraggableBackground(props) {
    const aspectRatio = 2172 / 918
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    })
    const [hoveredDot, setHoveredDot] = useState<number | null>(null)
    const [isClient, setIsClient] = useState(false)
    const [viewportHeight, setViewportHeight] = useState(0)

    // Function to update viewport height
    const updateViewportHeight = () => {
        const vh = window.innerHeight
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        setViewportHeight(vh)
    }

    useEffect(() => {
        setIsClient(true)
        // Initial viewport height setup
        updateViewportHeight()

        const updateConstraints = () => {
            if (!containerRef.current) return
            const containerWidth = window.innerWidth
            const containerHeight = viewportHeight || window.innerHeight
            const imageWidth = Math.max(
                containerWidth,
                aspectRatio * containerHeight
            )
            const overflow = imageWidth - containerWidth
            setConstraints({ left: -overflow, right: 0 })
        }

        const img = new Image()
        img.src = props.imageUrl
        img.onload = () => {
            updateConstraints()
        }

        // Event listeners for viewport changes
        window.addEventListener("resize", () => {
            updateViewportHeight()
            updateConstraints()
        })
        window.addEventListener("orientationchange", () => {
            setTimeout(() => {
                updateViewportHeight()
                updateConstraints()
            }, 100)
        })

        // Prevent overscroll behavior
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
        document.body.style.height = "100%"

        return () => {
            window.removeEventListener("resize", updateConstraints)
            window.removeEventListener("orientationchange", updateConstraints)
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
            document.body.style.position = ""
            document.body.style.width = ""
            document.body.style.height = ""
        }
    }, [props.imageUrl])

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

            {isClient && (
                <>
                    <Dot
                        key="scholarship"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={13}
                        x={x}
                        dotX={1800}
                        dotY={120}
                        linkUrl={props.linkScholarship || "#"}
                        hoverText={props.textScholarship || "Scholarship"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="2025poster"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={1}
                        x={x}
                        dotX={1500}
                        dotY={135}
                        linkUrl={props.link2025Poster || "#"}
                        hoverText={props.text2025Poster || "2025 Poster"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="2025calendar"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={2}
                        x={x}
                        dotX={1150}
                        dotY={350}
                        linkUrl={props.link2025Calendar || "#"}
                        hoverText={props.text2025Calendar || "2025 Calendar"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="elva"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={3}
                        x={x}
                        dotX={950}
                        dotY={175}
                        linkUrl={props.linkElva || "#"}
                        hoverText={props.textElva || "Elva"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="computer"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={4}
                        x={x}
                        dotX={1100}
                        dotY={700}
                        linkUrl={props.linkComputer || "#"}
                        hoverText={props.textComputer || "Computer"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="bryanphoto"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={5}
                        x={x}
                        dotX={364}
                        dotY={140}
                        linkUrl={props.linkBryanPhoto || "#"}
                        hoverText={props.textBryanPhoto || "Bryan Photo"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="books"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={6}
                        x={x}
                        dotX={777}
                        dotY={584}
                        linkUrl={props.linkBooks || "#"}
                        hoverText={props.textBooks || "Books"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="headphones"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={7}
                        x={x}
                        dotX={458}
                        dotY={588}
                        linkUrl={props.linkHeadphones || "#"}
                        hoverText={props.textHeadphones || "Headphones"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="bookshelf"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={8}
                        x={x}
                        dotX={129}
                        dotY={400}
                        linkUrl={props.linkBookshelf || "#"}
                        hoverText={props.textBookshelf || "Bookshelf"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="phone"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={9}
                        x={x}
                        dotX={1700}
                        dotY={800}
                        linkUrl={props.linkPhone || "#"}
                        hoverText={props.textPhone || "Phone"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="hoodie"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={10}
                        x={x}
                        dotX={1400}
                        dotY={600}
                        linkUrl={props.linkHoodie || "#"}
                        hoverText={props.textHoodie || "Hoodie"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="mic"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={11}
                        x={x}
                        dotX={1025}
                        dotY={500}
                        linkUrl={props.linkMic || "#"}
                        hoverText={props.textMic || "Mic"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                    <Dot
                        key="polaroids"
                        containerRef={containerRef}
                        aspectRatio={aspectRatio}
                        number={12}
                        x={x}
                        dotX={1500}
                        dotY={135}
                        linkUrl={props.linkPolaroids || "#"}
                        hoverText={props.textPolaroids || "Polaroids"}
                        hoveredDot={hoveredDot}
                        setHoveredDot={setHoveredDot}
                    />
                </>
            )}
        </div>
    )
}

// Required for Framer component catalog
DraggableBackground.title = "Draggable Background"
