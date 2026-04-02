const caseVariants = [
  { name: "SUPER BLUE", colorClass: "bg-[#43d9d9]", handle: "bump-case-cyan" },
  { name: "NEON RED", colorClass: "bg-[#ff4d4d]", handle: "bump-case-red" },
  { name: "LIME GREEN", colorClass: "bg-[#80ff66]", handle: "bump-case-green" },
  { name: "STEALTH GREY", colorClass: "bg-[#4a4a4a]", handle: "bump-case-grey" }
];
const caseSizes = ["IPHONE 17 PRO MAX", "IPHONE 17 PRO", "IPHONE 16 PRO MAX", "IPHONE 16 PRO"];

const apparelVariants = [
  { name: "BLACK", colorClass: "bg-[#29292c]", handle: "jpal-tshirt-black" },
];
const apparelSizes = ["S", "M", "L", "XL", "XXL"];

export const mockProducts = [
  {
    id: "cyan_case_1",
    type: "case",
    title: "Bump Case",
    handle: "bump-case-cyan",
    price: 25.00,
    colorName: "SUPER BLUE",
    colorClass: "bg-[#43d9d9]",
    gradient: "radial-gradient(circle at 50% 50%, #5eaeb8 0%, #123f46 100%)",
    desc: "Soft touch silicone iPhone case with molded bump on the back to provide a unique sensory experience.",
    pos: { top: "5%", left: "10%" },
    variants: caseVariants,
    sizes: caseSizes
  },
  {
    id: "red_case_1",
    type: "case",
    title: "Bump Case",
    handle: "bump-case-red",
    price: 25.00,
    colorName: "NEON RED",
    colorClass: "bg-[#ff4d4d]",
    gradient: "radial-gradient(circle at 50% 50%, #d94343 0%, #461212 100%)",
    desc: "Soft touch silicone iPhone case.",
    pos: { top: "10%", left: "45%" },
    variants: caseVariants,
    sizes: caseSizes
  },
  {
    id: "grey_case_1",
    type: "case",
    title: "Bump Case",
    handle: "bump-case-grey",
    price: 25.00,
    colorName: "STEALTH GREY",
    colorClass: "bg-[#4a4a4a]",
    gradient: "radial-gradient(circle at 50% 50%, #4a4a4a 0%, #1a1a1a 100%)",
    desc: "Soft touch silicone iPhone case.",
    pos: { top: "15%", left: "85%" },
    variants: caseVariants,
    sizes: caseSizes
  },
  {
    id: "green_case_1",
    type: "case",
    title: "Bump Case",
    handle: "bump-case-green",
    price: 25.00,
    colorName: "LIME GREEN",
    colorClass: "bg-[#80ff66]",
    gradient: "radial-gradient(circle at 50% 50%, #80ff66 0%, #1a4a1a 100%)",
    desc: "Soft touch silicone iPhone case.",
    pos: { top: "25%", left: "65%" },
    variants: caseVariants,
    sizes: caseSizes
  },
  {
    id: "black_shirt_1",
    type: "shirt",
    title: "JPAL T-Shirt",
    handle: "jpal-tshirt-black",
    price: 45.00,
    colorName: "BLACK",
    colorClass: "",
    gradient: "radial-gradient(circle at 50% 50%, #2f2f2f 0%, #000000 100%)",
    desc: "Heavyweight cotton tee. Fits boxy with large graphic hit.",
    pos: { top: "45%", left: "15%" },
    variants: apparelVariants,
    sizes: apparelSizes
  },
  {
    id: "black_hoodie_1",
    type: "hoodie",
    title: "JPAL Hoodie",
    handle: "jpal-hoodie-black",
    price: 85.00,
    colorName: "BLACK",
    colorClass: "",
    gradient: "radial-gradient(circle at 60% 40%, #1a1a1a 0%, #050505 100%)",
    desc: "Classic fit french terry hoodie. Raised print graphic.",
    pos: { top: "65%", left: "70%" },
    variants: apparelVariants,
    sizes: apparelSizes
  },
];

export const getProductByHandle = (handle: string) => {
    return mockProducts.find(product => product.handle === handle);
};
