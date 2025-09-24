import { env } from "@/env"
import { getChapterBySlug } from "@/services/chapters/server-queries"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Novel Cover"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string; chapterSlug: string }> }) {
  const { chapterSlug, slug } = await params;
  const chapter = await getChapterBySlug(chapterSlug, slug);

  if (!chapter) {
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
          Chapter not found
        </div>
      ),
      { ...size }
    );
  }

  const imageUrl = `https://wsrv.nl/?url=${env.NEXT_PUBLIC_BASE_URL}/novels/${chapter.novelSlug}/image&q=100&maxage=7d&default=https://static.devilsect.com/No-Image-Placeholder.svg`

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
          backgroundColor: '#0f172a',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 33%, #212121 100%)',
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
            alt={`${chapter.title} Cover`}
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
          {/* Novel Title */}
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '800',
              lineHeight: '1.1',
              margin: '0 0 16px 0',
              textTransform: 'capitalize',
              letterSpacing: '-2px',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#cbd5e1',
              opacity: 0.9,
            }}
          >
            {chapter.novelTitle}
          </h1>

          {/* Chapter Title */}
          <p
            style={{
              fontSize: chapter.novelTitle.length > 20 ? '52px' : '64px',
              fontWeight: '500',
              margin: '0 0 32px 0',
              color: 'white',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {chapter.title}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
