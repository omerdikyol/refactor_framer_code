/**
 * Configuration for a single dot on the background
 */
export interface DotConfig {
  /** Unique identifier for the dot */
  id: string;
  /** Unique number identifier for the dot (used for hover state) */
  number: number;
  /** X coordinate on the background image */
  dotX: number;
  /** Y coordinate on the background image */
  dotY: number;
  /** Property name for the link URL in the props object */
  linkProp: string;
  /** Default URL if the prop is not provided */
  defaultLink: string;
  /** Property name for the hover text in the props object */
  textProp: string;
  /** Default text if the prop is not provided */
  defaultText: string;
}

/**
 * Array of dot configurations
 * 
 * To add a new dot:
 * 1. Add a new entry to this array
 * 2. Use a unique id and number
 * 3. Set dotX and dotY coordinates based on the 2172x918 background image
 * 4. Add corresponding property controls in the DraggableBackground component
 */
const dotConfigs: DotConfig[] = [
  {
    id: "scholarship",
    number: 13,
    dotX: 1800,
    dotY: 120,
    linkProp: "linkScholarship",
    defaultLink: "#",
    textProp: "textScholarship",
    defaultText: "Scholarship",
  },
  {
    id: "2025poster",
    number: 1,
    dotX: 1500,
    dotY: 135,
    linkProp: "link2025Poster",
    defaultLink: "#",
    textProp: "text2025Poster",
    defaultText: "2025 Poster",
  },
  {
    id: "2025calendar",
    number: 2,
    dotX: 1150,
    dotY: 350,
    linkProp: "link2025Calendar",
    defaultLink: "#",
    textProp: "text2025Calendar",
    defaultText: "2025 Calendar",
  },
  {
    id: "elva",
    number: 3,
    dotX: 950,
    dotY: 175,
    linkProp: "linkElva",
    defaultLink: "#",
    textProp: "textElva",
    defaultText: "Elva",
  },
  {
    id: "computer",
    number: 4,
    dotX: 1100,
    dotY: 700,
    linkProp: "linkComputer",
    defaultLink: "#",
    textProp: "textComputer",
    defaultText: "Computer",
  },
  {
    id: "bryanphoto",
    number: 5,
    dotX: 364,
    dotY: 140,
    linkProp: "linkBryanPhoto",
    defaultLink: "#",
    textProp: "textBryanPhoto",
    defaultText: "Bryan Photo",
  },
  {
    id: "books",
    number: 6,
    dotX: 777,
    dotY: 584,
    linkProp: "linkBooks",
    defaultLink: "#",
    textProp: "textBooks",
    defaultText: "Books",
  },
  {
    id: "headphones",
    number: 7,
    dotX: 458,
    dotY: 588,
    linkProp: "linkHeadphones",
    defaultLink: "#",
    textProp: "textHeadphones",
    defaultText: "Headphones",
  },
  {
    id: "bookshelf",
    number: 8,
    dotX: 129,
    dotY: 400,
    linkProp: "linkBookshelf",
    defaultLink: "#",
    textProp: "textBookshelf",
    defaultText: "Bookshelf",
  },
  {
    id: "phone",
    number: 9,
    dotX: 1700,
    dotY: 800,
    linkProp: "linkPhone",
    defaultLink: "#",
    textProp: "textPhone",
    defaultText: "Phone",
  },
  {
    id: "hoodie",
    number: 10,
    dotX: 1400,
    dotY: 600,
    linkProp: "linkHoodie",
    defaultLink: "#",
    textProp: "textHoodie",
    defaultText: "Hoodie",
  },
  {
    id: "mic",
    number: 11,
    dotX: 1025,
    dotY: 500,
    linkProp: "linkMic",
    defaultLink: "#",
    textProp: "textMic",
    defaultText: "Mic",
  },
  {
    id: "polaroids",
    number: 12,
    dotX: 1500,
    dotY: 135,
    linkProp: "linkPolaroids",
    defaultLink: "#",
    textProp: "textPolaroids",
    defaultText: "Polaroids",
  },
];

export default dotConfigs;
