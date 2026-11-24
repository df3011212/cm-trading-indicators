import type { ReactNode } from "react";
import { Root } from "@/components/root";
import { metadataFor } from "@/lib/metadata";
export const metadata = metadataFor("zh-TW");
export default function Layout({ children }: { children: ReactNode }) {
  return <Root lang="zh-TW">{children}</Root>;
}
