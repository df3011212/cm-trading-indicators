import { ContentPage } from "@/components/content-page";
import { metadataFor } from "@/lib/metadata";
export const metadata = metadataFor("en", "indicators");
export default function Page() { return <ContentPage lang="en" page="indicators" />; }
