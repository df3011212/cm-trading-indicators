import type { ReactNode } from "react";
import { Root } from "@/components/root";
import { metadataFor } from "@/lib/metadata";
export const metadata = metadataFor("en");
export default function Layout({ children }: { children: ReactNode }) {
  return <Root lang="en">{children}</Root>;
}
