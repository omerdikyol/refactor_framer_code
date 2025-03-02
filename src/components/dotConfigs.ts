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
  /** Property name for the link URL in the props object (for Framer UI) */
  linkProp: string;
  /** URL for the dot to navigate to when clicked */
  defaultLink: string;
  /** Property name for the hover text in the props object (for Framer UI) */
  textProp: string;
  /** Text to display in the tooltip */
  defaultText: string;
  /** Property name for the visibility in the props object (for Framer UI) */
  visibleProp?: string;
  /** Whether the dot is visible */
  defaultVisible?: boolean;
  /** Property name for opening in new window in the props object (for Framer UI) */
  newWindowProp?: string;
  /** Whether to open the URL in a new window */
  defaultNewWindow?: boolean;
}

/**
 * Array of dot configurations
 * 
 * To add a new dot:
 * 1. Add a new entry to this array
 * 2. Use a unique id and number
 * 3. Set dotX and dotY coordinates based on the 2172x918 background image
 * 4. Configure the dot's properties directly in this file:
 *    - defaultLink: The URL to navigate to when clicked
 *    - defaultText: The text to show in the tooltip
 *    - defaultVisible: Set to false to hide the dot
 *    - defaultNewWindow: Set to true to open links in a new window
 */
const dotConfigs: DotConfig[] = [
  {
    id: "scholarship",
    number: 13,
    dotX: 1800,
    dotY: 120,
    linkProp: "linkScholarship",
    defaultLink: "https://example.com/scholarship",  // Change this URL directly
    textProp: "textScholarship",
    defaultText: "Scholarship",  // Change this text directly
    visibleProp: "visibleScholarship",
    defaultVisible: true,  // Set to false to hide this dot
    newWindowProp: "newWindowScholarship",
    defaultNewWindow: true,  // Set to true to open in new window
  },
  {
    id: "2025poster",
    number: 1,
    dotX: 1500,
    dotY: 135,
    linkProp: "link2025Poster",
    defaultLink: "https://example.com/poster",
    textProp: "text2025Poster",
    defaultText: "2025 Poster",
    visibleProp: "visible2025Poster",
    defaultVisible: false,  // This dot will be hidden
    newWindowProp: "newWindow2025Poster",
    defaultNewWindow: false,
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
    visibleProp: "visible2025Calendar",
    defaultVisible: true,
    newWindowProp: "newWindow2025Calendar",
    defaultNewWindow: false,
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
    visibleProp: "visibleElva",
    defaultVisible: true,
    newWindowProp: "newWindowElva",
    defaultNewWindow: false,
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
    visibleProp: "visibleComputer",
    defaultVisible: true,
    newWindowProp: "newWindowComputer",
    defaultNewWindow: false,
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
    visibleProp: "visibleBryanPhoto",
    defaultVisible: true,
    newWindowProp: "newWindowBryanPhoto",
    defaultNewWindow: false,
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
    visibleProp: "visibleBooks",
    defaultVisible: true,
    newWindowProp: "newWindowBooks",
    defaultNewWindow: false,
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
    visibleProp: "visibleHeadphones",
    defaultVisible: true,
    newWindowProp: "newWindowHeadphones",
    defaultNewWindow: false,
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
    visibleProp: "visibleBookshelf",
    defaultVisible: true,
    newWindowProp: "newWindowBookshelf",
    defaultNewWindow: false,
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
    visibleProp: "visiblePhone",
    defaultVisible: true,
    newWindowProp: "newWindowPhone",
    defaultNewWindow: false,
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
    visibleProp: "visibleHoodie",
    defaultVisible: true,
    newWindowProp: "newWindowHoodie",
    defaultNewWindow: false,
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
    visibleProp: "visibleMic",
    defaultVisible: true,
    newWindowProp: "newWindowMic",
    defaultNewWindow: false,
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
    visibleProp: "visiblePolaroids",
    defaultVisible: true,
    newWindowProp: "newWindowPolaroids",
    defaultNewWindow: false,
  },
];

export default dotConfigs;
