import OpengraphImage from "./opengraph-image";

export const alt = "Atirson Fabiano — Senior React Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export default OpengraphImage;
