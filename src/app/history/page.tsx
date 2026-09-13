import { pageMetadata } from "@/lib/site";
import { HistoryPage } from "@/components/history-page";
import "./history.css";

export const metadata = pageMetadata("/history", "History of Tamai — Records, Stories & Memory", "Explore a growing bilingual history archive for Tamai, with clearly distinguished documented history, oral accounts, community memories and topics under review.");
export default function Page() { return <HistoryPage/>; }
