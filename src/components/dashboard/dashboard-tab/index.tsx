'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NovelInfo from "./novel-info";
import { Separator } from "@/components/ui/separator";
import { Novel } from "@/types/novel";
import NovelChapters from "./novel-chapters";
import { useQueryState } from "nuqs";

const DashboardTab = ({ novel }: { novel: Novel }) => {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "novel" });

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v)} className="w-full">
      <TabsList className="grid grid-cols-2 w-full border border-zinc-50/10">
        <TabsTrigger value="novel">Novel Info</TabsTrigger>
        <TabsTrigger value="chapters">Chapters</TabsTrigger>
      </TabsList>
      <Separator className="mt-4" />
      <TabsContent value="novel">
        <NovelInfo novel={novel} />
      </TabsContent>
      <TabsContent value="chapters">
        <NovelChapters novel={novel} />
      </TabsContent>
    </Tabs>
  )
}

export default DashboardTab;
