import { env } from "@/env"
import { formatViews } from "@/lib/utils"
import { getNovelBySlug } from "@/services/novels/server-queries"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Novel Cover"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const novel = await getNovelBySlug(slug);

  const novelData = {
    ...novel,
    genres: novel.genres.slice(0, 4),
    metrics: {
      views: novel.metrics.views,
      ratingValue: novel.metrics.ratingValue,
    },
    imageUrl: `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image&q=100&maxage=7d`,
    fallbackUrl: `https://wsrv.nl/?urlhttps://static.devilsect.com/No-Image-Placeholder.svgimage&q=100&maxage=7d`
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        backgroundImage: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        padding: "60px",
      }}
    >
      {/* Novel Cover Image */}
      <div
        style={{
          display: "flex",
          width: "300px",
          height: "400px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          marginRight: "60px",
        }}
      >
        <img
          src={novelData.imageUrl || novelData.fallbackUrl}
          alt={novelData.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Novel Information */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          maxWidth: "600px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "0px",
            textTransform: "capitalize",
          }}
        >
          {novelData.title}
        </h1>

        {/* Author */}
        <p
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            marginBottom: "30px",
          }}
        >
          by {novelData.author}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                color: "#fbbf24",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center"
              }}
            >
              {novelData.metrics.ratingValue ?? "N/A"}
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#71717a",
              }}
            >
              Rating
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {novelData.chaptersCount.toLocaleString()}{" "}Ch.
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#71717a",
              }}
            >
              Chapters
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {formatViews(novelData.metrics.views)}
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#71717a",
              }}
            >
              Views
            </span>
          </div>
        </div>

        {/* Genres */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {novelData.genres.slice(0, 4).map((genre) => (
            <span
              key={genre}
              style={{
                backgroundColor: "#374151",
                color: "#d1d5db",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "16px",
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: "bold",
              borderWidth: "1px",
              borderColor: "rgb(239, 68, 68)",
              backgroundColor: "rgba(245, 73, 39)"
            }}
          >
            {novelData.status.replace("_", " ")}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
