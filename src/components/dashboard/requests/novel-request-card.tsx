
const NovelRequestCard = ({ title }: { title: string }) => {
  return (
    <p className="text-zinc-300">
      Requests novel: <a href={`https://google.com/search?q=${title}%20novel`} target="_blank" className="font-semibold text-zinc-200 underline">{title}</a>
    </p>
  )
}

export default NovelRequestCard;
