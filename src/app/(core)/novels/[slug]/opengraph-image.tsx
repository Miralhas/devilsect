import { env } from "@/env"
import { statusMap } from "@/lib/utils"
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

  if (!novel) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          Novel not found
        </div>
      ),
      { ...size }
    );
  }

  const imageUrl = `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image&w=150&maxage=7d&output=jpg&default=https://static.devilsect.com/No-Image-Placeholder.svg&w=150`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000, #292929, #212121)',
          padding: '60px',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* Left side - Novel cover image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '480px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <img
            src={imageUrl}
            alt={`${novel.title} Cover`}
            width={320}
            height={480}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Right side - Novel information */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
            paddingLeft: '60px',
            paddingTop: "28px",
            color: 'white',
            maxWidth: "600px"
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: novel.title.length > 20 ? '52px' : '64px',
              fontWeight: '800',
              lineHeight: '1.1',
              margin: '0 0 16px 0',
              color: 'white',
              textTransform: 'capitalize',
              letterSpacing: '-2px',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {novel.title}
          </h1>

          {/* Author */}
          <p
            style={{
              fontSize: '28px',
              fontWeight: '500',
              margin: '0 0 32px 0',
              color: '#cbd5e1',
              opacity: 0.9,
            }}
          >
            by {novel.author}
          </p>

          {/* Genres */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {novel.genres.slice(0, 3).map((genre: string) => (
              <span
                key={genre}
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.2)',
                  border: '2px solid rgba(220, 38, 38, 0.4)',
                  color: 'white',
                  borderRadius: '24px',
                  padding: '8px 16px',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: "column",
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                border: '2px solid rgba(220, 38, 38, 0.4)',
                color: '#f87171',
                borderRadius: '12px',
                padding: '12px 24px',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                {statusMap[novel.status]}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '32px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              <span>
                {novel.chaptersCount} Chapters
              </span>
            </div>

          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
