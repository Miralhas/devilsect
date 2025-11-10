import DesktopGridTable from "@/components/ranking/grid-table/desktop-grid-table";
import GridTableHeader from "@/components/ranking/grid-table/grid-table-header";
import MobileGridTable from "@/components/ranking/grid-table/mobile-grid-table";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { Metadata } from "next";
import BayesianScoreDescription from "./bayesian-score-description";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";

export const metadata: Metadata = {
  title: "Ranking",
  description: "The Ranking system uses a Bayesian score that blends ratings and views to fairly reflect both quality and popularity."
};

const RankingPage = async () => {
  const query = await getNovelSummaries({ size: 100, sort: SortKey.BAYESIAN_RANKING });

  return (
    <section className="md:pt-3 space-y-2.5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Ranking", "/ranking")).replace(/</g, '\\u003c'),
        }}
      />
      <GridTableHeader />
      <DesktopGridTable novels={query.results} />
      <MobileGridTable novels={query.results} />
      <BayesianScoreDescription />
    </section>
  )
}

export default RankingPage;
