import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

export const alt = "Atirson Fabiano — Senior React Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

const translations = { en, pt };

// Social preview built from the same locale copy as the page, so it never
// drifts from the site. Shared by twitter-image.tsx.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translations[locale === "pt" ? "pt" : "en"];

  const photo = await readFile(join(process.cwd(), "public/og-photo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  // Skip the first two entries (current employers) so the list fits in two lines.
  const companies = t.trustedBy.names.slice(2).join(" · ");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#fff7ed",
        padding: 64,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#000" }}>Atirson Fabiano</div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.05,
              marginTop: 12,
            }}
          >
            {`${t.role1} ${t.role2}`}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#c2410c",
              marginTop: 20,
              lineHeight: 1.3,
            }}
          >
            {t.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              color: "rgba(0,0,0,0.55)",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {t.trustedBy.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#000",
              marginTop: 10,
              lineHeight: 1.35,
            }}
          >
            {companies}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "rgba(0,0,0,0.6)" }}>
          www.atirson.com
        </div>
      </div>

      <img
        src={photoSrc}
        alt=""
        width={420}
        height={502}
        style={{ objectFit: "cover", borderRadius: 12 }}
      />
    </div>,
    size,
  );
}
