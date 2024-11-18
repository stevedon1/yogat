interface Page {
  name: string;
  link: string;
  path: string;
}

export const pages: Page[] = [
  {
    name: "Stock",
    link: "/stock",
    path: "/stock",
  },
  {
    name: "Debts",
    link: "/debts/debtors",
    path: "/debts",
  },
  {
    name: "Stats",
    link: "/stats",
    path: "/stats",
  },
  {
    name: "To Dos",
    link: "/todos",
    path: "/todos",
  },
  {
    name: "Tools/Assets",
    link: "/tools-assets",
    path: "/tools-assets",
  },
  {
    name: "Calculator",
    link: "/calculator",
    path: "/calculator",
  },
];
export const stockList = [
  "250 ML Tumblers",
  "Lids 250 ML",
  "500 ML Tumblers",
  "Lids 500 ML",
  "Cling",
  "Straws",
  "Transport",
  "Strawberry Flavour",
  "Vanilla Flavour",
  "Chocolate Flavour",
  "Any other Flavour",
  "Food Colour",
  "Corn Flour",
  "Gelatin",
  "Sugar",
  "Sweetener",
  "Culture",
  "Preservative",
]