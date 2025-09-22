import { User } from "./authentication";

export type CommentType = "NOVEL_REVIEW" | "CHAPTER_REVIEW";

export type ThreadedComment = {
  id: number;
  parentId: number | null;
  commenter: User;
  createdAt: string;
  updatedAt: string;
  isSpoiler: boolean;
  voters: Vote[];
  voteCount: number;
  message: string;
  childComments: ThreadedComment[];
  type: CommentType
};

export type CommentInput = {
  message: string;
  isSpoiler: boolean;
  parentCommentId: number | null;
}

export type Vote = {
  voter: string;
  type: "UPVOTE" | "DOWNVOTE"
}

export type UserComment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  isSpoiler: boolean;
  voteCount: number;
  message: string;
}

export type UserReview = UserComment & {
  novelSlug: string;
  novelTitle: string;
  type: "NOVEL_REVIEW";
}

export type UserChapterComment = UserComment & {
  novelSlug: string;
  novelTitle: string;
  chapterTitle: string;
  chapterSlug: string;
  type: "CHAPTER_REVIEW";
}