const ShopPriceFilters = [
  { name: "Less than $25", min: 0, max: 25 },
  { name: "$25 - $50", min: 25, max: 50 },
  { name: "$50 - $100", min: 50, max: 100 },
  { name: "$100 - $200", min: 100, max: 200 },
  { name: "$200 and Above", min: 200, max: 999999 },
];

const shopRatingFilters = [
  { name: "4+ Stars", min: 4, max: 5 },
  { name: "3+ Stars", min: 3, max: 5 },
  { name: "2+ Stars", min: 2, max: 5 },
  { name: "1+ Stars", min: 1, max: 5 },
];

export { ShopPriceFilters, shopRatingFilters };
