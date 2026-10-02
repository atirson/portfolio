import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { pickLocale } from "@/app/lib/locale";

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language");
  redirect(`/${pickLocale(acceptLanguage)}`);
}
