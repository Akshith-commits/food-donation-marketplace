// FoodBridge Food Image Resolver
// Maps dishes to authentic high-resolution local photography in /images

export const FOOD_IMAGE_MAP = {
  biryani: "/images/biryani.jpg",
  pulao: "/images/pulao.jpg",
  idli: "/images/idli.jpg",
  sweets: "/images/sweets.jpg",
  chai: "/images/chai.jpg",
  curry: "/images/curry.jpg",
  dal: "/images/dal.jpg",
};

export function getFoodImage(foodName = "", category = "") {
  const name = (foodName || "").toLowerCase();
  const cat = (category || "").toLowerCase();

  if (name.includes("biryani")) return FOOD_IMAGE_MAP.biryani;
  if (name.includes("pulao") || (name.includes("rice") && !name.includes("dal"))) return FOOD_IMAGE_MAP.pulao;
  if (name.includes("idli") || name.includes("sambar") || name.includes("tiffin") || name.includes("dosa")) return FOOD_IMAGE_MAP.idli;
  if (name.includes("chai") || name.includes("biscuit") || name.includes("tea") || name.includes("rusk") || cat.includes("bakery")) return FOOD_IMAGE_MAP.chai;
  if (name.includes("meetha") || name.includes("khubani") || name.includes("sweet") || cat.includes("dessert")) return FOOD_IMAGE_MAP.sweets;
  if (name.includes("chapati") || name.includes("roti") || name.includes("paneer") || name.includes("curry")) return FOOD_IMAGE_MAP.curry;
  if (name.includes("dal") || name.includes("tadka")) return FOOD_IMAGE_MAP.dal;

  // Fallback based on category
  if (cat.includes("bakery")) return FOOD_IMAGE_MAP.chai;
  if (cat.includes("dessert")) return FOOD_IMAGE_MAP.sweets;
  if (cat.includes("tiffin")) return FOOD_IMAGE_MAP.idli;

  return FOOD_IMAGE_MAP.biryani;
}
