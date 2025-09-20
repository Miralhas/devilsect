import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NovelInfo from "./novel-info";
import { Separator } from "@/components/ui/separator";
import { Novel } from "@/types/novel";

const DashboardTab = ({ novel }: { novel: Novel }) => {
  return (
    <Tabs defaultValue="novel-info" className="w-full">
      <TabsList className="grid grid-cols-2 w-full border border-zinc-50/10">
        <TabsTrigger value="novel-info">Novel Info</TabsTrigger>
        <TabsTrigger value="chapters">Chapters</TabsTrigger>
      </TabsList>
      <Separator className="mt-4" />
      <TabsContent value="novel-info">
        <NovelInfo novel={novel} />
      </TabsContent>
      <TabsContent value="chapters">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default DashboardTab;
