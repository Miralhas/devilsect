import { User } from "./authentication";
import { ChapterInfo } from "./chapter";
import { NovelInfo } from "./novel";

export type Action = "complete" | "deny";

export type ChapterError = {
  id: number;
  slug: string;
  name: string;
  description: string;
}

type BaseRequest = {
  id: number;
  status: "COMPLETED" | "PENDING" | "DENIED";
  type: string;
  createdAt: string;
  user: User;
}

export type NovelRequest = BaseRequest & {
  novelTitle: string;
  type: "NOVEL_REQUEST";
}

export type ChapterRequest = BaseRequest & {
  novel: NovelInfo;
  type: "CHAPTER_REQUEST";

}

export type FixChapterRequest = BaseRequest & {
  type: "FIX_CHAPTER_REQUEST";
  errors: ChapterError[];
  chapterInfoDTO: ChapterInfo;
}

export type RequestUnion =
  | NovelRequest
  | ChapterRequest
  | FixChapterRequest