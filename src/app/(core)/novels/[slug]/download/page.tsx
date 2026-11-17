import NovelPage from "../page";

export default function DownloadPage(props: PageProps<"/novels/[slug]">) {
  return <NovelPage {...props} download />;
}