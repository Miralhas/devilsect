import DesktopGridTable from "@/components/ranking/grid-table/desktop-grid-table";
import GridTableHeader from "@/components/ranking/grid-table/grid-table-header";
import MobileGridTable from "@/components/ranking/grid-table/mobile-grid-table";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking",
  description: "The Ranking system uses a Bayesian score that blends ratings and views to fairly reflect both quality and popularity."
};

const RankingPage = async () => {
  const query = await getNovelSummaries({ size: 100, sort: SortKey.BAYESIAN_RANKING });

  return (
    <section className="md:pt-8 space-y-2.5">
      <GridTableHeader />
      <DesktopGridTable novels={query.results} />
      <MobileGridTable novels={query.results} />
      <Footer />
    </section>
  )
}

const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full text-center">
      <p className="text-xs text-muted-foreground font-medium">The Ranking system uses a Bayesian score that blends ratings and views to fairly reflect both quality and popularity.</p>
    </div>
  )
}
export default RankingPage;
