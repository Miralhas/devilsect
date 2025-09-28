'use client'

import { env } from "@/env";
import { buildQueryString } from "@/utils/string-utils";
import { ImageLoaderProps } from "next/image";

export type WsrvParams = {
  // Size / Scaling
  dpr?: number;              // Device pixel ratio (1–8); requires w or h :contentReference[oaicite:2]{index=2}

  // Fit & Crop
  fit?: 'cover' | 'contain'; // Resizing fit mode :contentReference[oaicite:3]{index=3}
  a?:
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-right'
  | 'focal'
  | 'entropy'
  | 'attention';             // Alignment or smart crop :contentReference[oaicite:4]{index=4}
  fpx?: number;              // Focal point X (0.0–1.0); requires a='focal' :contentReference[oaicite:5]{index=5}
  fpy?: number;              // Focal point Y (0.0–1.0) :contentReference[oaicite:6]{index=6}
  cx?: number | string;      // Rectangle crop X coordinate (can be '%') :contentReference[oaicite:7]{index=7}
  cy?: number | string;      // Rectangle crop Y coordinate :contentReference[oaicite:8]{index=8}
  cw?: number | string;      // Rectangle crop width :contentReference[oaicite:9]{index=9}
  ch?: number | string;      // Rectangle crop height :contentReference[oaicite:10]{index=10}
  trim?: number | true;      // Trim edges; default tolerance 10 if true :contentReference[oaicite:11]{index=11}

  // Orientation
  flip?: boolean;            // Vertical mirror (x-axis) :contentReference[oaicite:12]{index=12}
  flop?: boolean;            // Horizontal mirror (y-axis) :contentReference[oaicite:13]{index=13}
  ro?: number | 'auto';      // Rotation angle or auto-orient via EXIF :contentReference[oaicite:14]{index=14}
  rbg?: string;              // Background color if rotated at non-90° angle :contentReference[oaicite:15]{index=15}

  // Adjustments & Filters
  bg?: string;               // Background color (hex, ARGB, or CSS names) :contentReference[oaicite:16]{index=16}
  blur?: number | true;      // Gaussian blur; true → mild fast blur :contentReference[oaicite:17]{index=17}
  con?: number;              // Contrast; range −100 to +100 :contentReference[oaicite:18]{index=18}
  filt?: 'greyscale' | 'sepia' | 'duotone' | 'negate'; // Filter effects :contentReference[oaicite:19]{index=19}
  start?: string;            // Duotone start color (hex) :contentReference[oaicite:20]{index=20}
  stop?: string;             // Duotone stop color (hex) :contentReference[oaicite:21]{index=21}
  gam?: number;              // Gamma; range 1.0–3.0, default 2.2 :contentReference[oaicite:22]{index=22}
  // mod?: [number, number, number]; // brightness, saturation, hue rotation :contentReference[oaicite:23]{index=23}
  sat?: number;              // Saturation multiplier :contentReference[oaicite:24]{index=24}
  hue?: number;              // Hue rotation in degrees :contentReference[oaicite:25]{index=25}
  sharp?: number | true;     // Sharpen; true → mild sharpen :contentReference[oaicite:26]{index=26}
  sharpf?: number;           // Sharpen flat areas level :contentReference[oaicite:27]{index=27}
  sharpj?: number;           // Sharpen jagged areas level :contentReference[oaicite:28]{index=28}
  tint?: string;             // Tint color (hex or name) :contentReference[oaicite:29]{index=29}

  // Format & Encoding
  output?: 'jpg' | 'png' | 'gif' | 'tiff' | 'webp' | 'json'; // Output format :contentReference[oaicite:30]{index=30}
  encoding?: 'base64';       // Encode image as Base64 data URL :contentReference[oaicite:31]{index=31}
  l?: number;                // PNG zlib compression level 0–9 :contentReference[oaicite:32]{index=32}
  af?: boolean;              // Adaptive filter for PNG output :contentReference[oaicite:33]{index=33}
  il?: boolean;              // Interlace/progressive for GIF/PNG/JPEG :contentReference[oaicite:34]{index=34}
  n?: number;                // Number of pages for animated or multi-page images :contentReference[oaicite:35]{index=35}
  ll?: boolean;              // Lossless WebP output :contentReference[oaicite:36]{index=36}
  page?: number;             // Page number for PDF/TIFF/ICO; -1 largest, -2 smallest :contentReference[oaicite:38]{index=38}

  // Cache and Defaults
  maxage?: string;           // Browser Cache-Control max-age (1d–1y) :contentReference[oaicite:39]{index=39}
  default?: string | true;   // Default image if load fails; true → redirect to original URL :contentReference[oaicite:40]{index=40}
  filename?: string;         // Filename in Content-Disposition header (alphanumeric only) :contentReference[oaicite:41]{index=41}

  // Mask Shapes
  mask?:
  | 'circle'
  | 'ellipse'
  | 'triangle'
  | 'triangle-180'
  | 'pentagon'
  | 'pentagon-180'
  | 'hexagon'
  | 'square'     // square rotated 45°
  | 'star'       // 5-point
  | 'heart';
  mtrim?: boolean; // Trim remaining whitespace after masking
  mbg?: string; // Mask background color (hex/ARGB/CSS color)
}

const wsrvLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const queryString = buildQueryString({
    url: src,
    w: width.toString(),
    q: quality?.toString() || 75,
    output: 'webp',
    fit: 'cover',
    dpr: 2,
    maxage: '15d',
    il: true,
    af: true,
    evict: env.NEXT_PUBLIC_EVICT
  });
  return `https://wsrv.nl/${queryString}`;
};

export const createWsrvLoader = (params?: WsrvParams) => {
  return ({ src, width, quality }: ImageLoaderProps) => {
    const queryString = buildQueryString({
      ...params,
      url: src,
      w: width.toString(),
      q: quality?.toString() || 75,
      output: params?.output || 'webp',
      fit: params?.fit || 'cover',
      dpr: params?.dpr || 2,
      maxage: params?.maxage || '15d',
      il: params?.il || true,
      af: params?.af || true,
      evict: env.NEXT_PUBLIC_EVICT
    });

    return `https://wsrv.nl/${queryString}`;
  };
};

export default wsrvLoader;