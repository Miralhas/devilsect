import { User } from "./authentication";

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
  type: "NOVEL_REVIEW" | "CHAPTER_REVIEW"
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