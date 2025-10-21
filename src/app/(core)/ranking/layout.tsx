import RankingHeader from "@/components/ranking/ranking-header";
import { PropsWithChildren } from "react";
import BayesianScoreDescription from "./bayesian-score-description";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative pt-6 md:pt-12 min-h-screen space-y-5 p-4 pb-8">
      <RankingHeader />
      <BayesianScoreDescription />
      {children}
    </section>
  )
}

export default Layout;
