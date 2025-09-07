const AddCommentButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='rounded-2xl py-3 px-4 text-sm  bg-secondary/30 text-muted-foreground border border-zinc-50/15 cursor-text hover:bg-secondary/50 hover:border-zinc-50/30'
      onClick={onClick}
    >
      Add a comment...
    </div>
  )
}

export default AddCommentButton;
