import { LayoutGroup } from "framer-motion";
import FilterSection from "./filter-section";
import NovelList from "./novel-list";

const ContentSection = async () => {
  return (
    <div className="space-y-10">
      <LayoutGroup id="content-group">
        <FilterSection />
        <NovelList />
      </LayoutGroup>
    </div>
  )
}

export default ContentSection;
