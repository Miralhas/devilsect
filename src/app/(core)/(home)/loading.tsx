const HomeLoading = () => {
  return (
    <section className="min-h-screen w-full">
      <div className="flex items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
        <div className="flex flex-col gap-10 items-center justify-center bg-black/40 px-16 py-8 rounded-2xl border border-accent/80">
          <div className="h-32 aspect-square rounded-full bg-[radial-gradient(25%_25%_at_50%_25%,#000_24%,#fff_26%_99%,transparent_101%),radial-gradient(25%_25%_at_50%_75%,#fff_24%,#000_26%_99%,transparent_101%),conic-gradient(#000_50%,#fff_0)] border border-black animate-spin">
          </div>
          <p className="text-lg font-semibold tracking-tight text-balance animate-pulse">Loading content...</p>
        </div>
      </div>
    </section>
  )
}

export default HomeLoading;
