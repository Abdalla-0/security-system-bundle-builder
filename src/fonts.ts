import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy/Gilroy-Light.woff",
      weight: "300",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Regular.woff",
      weight: "400",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Medium.woff",
      weight: "500",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Bold.woff",
      weight: "700",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Heavy.woff",
      weight: "900",
    },
  ],
  variable: "--font-gilroy",
});

export const norms = localFont({
  src: [
    {
      path: "../public/fonts/Norms/TTNorms-Medium.woff",
      weight: "700",
    },
  ],
  variable: "--font-norms",
});
