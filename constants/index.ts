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
    link: "/debts",
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
];
