export interface HeroScreenConfig {
  id: number;
  slug: string;
  brandTitle: string;
  accentColor: string;
  textGradient: string;
  bgGradient: string;
  description: string;
  texturePath?: string;
  price?: string;
  intensity?: string;
  canRotation: [number, number, number];
}

export const HERO_SCREENS: HeroScreenConfig[] = [
  {
    id: 1,
    slug: "volt-original",
    brandTitle: "NITRO",
    accentColor: "#E0E600",
    // Exact Figma Radial Gradient: darker #7D8000 center behind can -> bright #E0E600 outer edges
    textGradient: "radial-gradient(circle at center, #7D8000 0%, #E0E600 68%)",
    bgGradient: "radial-gradient(circle at center, #181818 0%, #050505 78%)",
    description:
      "WOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NUNC VULPUTATE LIBERO ET VELIT INTERDUM, AC.",
    canRotation: [0, 0, -Math.PI / 2],
  },
  // {
  //   id: 2,
  //   slug: "cyber-crimson",
  //   brandTitle: "NITRO",
  //   accentColor: "#FF2A5F",
  //   textGradient: "radial-gradient(circle at center, #7A0E29 0%, #FF2A5F 68%)",
  //   bgGradient: "radial-gradient(circle at center, #1F1015 0%, #050505 78%)",
  //   description:
  //     "HIGH-OCTANE FORMULATION ENGINEERED FOR PEAK COGNITIVE FOCUS AND ENDURANCE.",
  //   canRotation: [0.15, 0.4, -Math.PI / 2 + 0.15],
  // },
  {
    id: 2,
    slug: "heritage-2002",
    brandTitle: "SINCE 2002 PRODUCING",
    accentColor: "#E0E600",
    textGradient: "radial-gradient(circle at center, #7D8000 0%, #E0E600 68%)",
    bgGradient: "radial-gradient(circle at center, #181818 0%, #050505 78%)",
    description:
      "ENGINEERED SINCE 2002 WITH UNCOMPROMISING POTENCY AND PREMIUM FORMULATION.",
    canRotation: [0, 0, -Math.PI / 2],
  },
  {
    id: 3,
    slug: "hyper-cyan",
    brandTitle: "NITRO",
    accentColor: "#00F0FF",
    textGradient: "radial-gradient(circle at center, #006B73 0%, #00F0FF 68%)",
    bgGradient: "radial-gradient(circle at center, #0E1C20 0%, #050505 78%)",
    description:
      "ZERO SUGAR ELECTROLYTE MATRIX DESIGNED FOR NEXT-GEN ATHLETES AND CREATORS.",
    canRotation: [-0.15, -0.4, -Math.PI / 2 - 0.15],
  },
];

export const GALLERY_FLAVORS = [
  {
    id: "org",
    name: "NITRO ORG",
    intensity: "High intensity",
    price: "10.58 $",
    accent: "#FF9900",
    texture: "/textures/can-orange.png",
  },
  {
    id: "red",
    name: "NITRO RED",
    intensity: "High intensity",
    price: "11.00 $",
    accent: "#FF2A2A",
    texture: "/textures/can-red.png",
  },
  {
    id: "green",
    name: "NITRO GREEN",
    intensity: "High intensity",
    price: "12.00 $",
    accent: "#E0E600",
    texture: "/textures/can-green.png",
  },
  {
    id: "sky",
    name: "NITRO SKY",
    intensity: "High intensity",
    price: "11.00 $",
    accent: "#00F0FF",
    texture: "/textures/can-sky.png",
  },
  {
    id: "blue",
    name: "NITRO BLUE",
    intensity: "High intensity",
    price: "10.58 $",
    accent: "#3B82F6",
    texture: "/textures/can-blue.png",
  },
];