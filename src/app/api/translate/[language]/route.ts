import translate, { getCode, languages } from "google-translate-api-x";
import { NextRequest, NextResponse } from "next/server";

const MAX_LENGTH_CHUNK_SIZE = 5000;

export const POST = async (req: NextRequest, { params }: { params: Promise<{ language: string }> }) => {
  const language = (await params).language;

  try {
    const res = await req.json() as { content: string };

    const languageCode = getCode(language);

    if (!languageCode) {
      return NextResponse.json(`Bad Request: Language '${language}' not supported`, { status: 400 });
    }

    if (languageCode === languages.en) {
      return NextResponse.json(res.content, { status: 200 });
    }

    const chunks = [];
    const content = res.content;
    for (let index = 0; index < Math.ceil(content.length / MAX_LENGTH_CHUNK_SIZE); index++) {
      chunks.push(content.slice(MAX_LENGTH_CHUNK_SIZE * index + 1, MAX_LENGTH_CHUNK_SIZE + MAX_LENGTH_CHUNK_SIZE * index))
    };

    const translatedChunks = await Promise.all(chunks.map(chunk => translate(chunk, {
      from: languages.en,
      to: languageCode,
      autoCorrect: true,
      forceBatch: true,
    })));

    const translatedChapter = translatedChunks.reduce((accumulator, currentValue) => accumulator + currentValue.text, '');

    return NextResponse.json(translatedChapter, { status: 200 });
  } catch (err) {
    return NextResponse.json(`Error: Internal Server Error: ${err}`, { status: 500 });
  }
}