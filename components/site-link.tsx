import type { ComponentProps } from "react";
import { site } from "@/lib/site";

export function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  const destination = href.startsWith("/") ? site.basePath + href : href;
  return <a href={destination} {...props} />;
}
