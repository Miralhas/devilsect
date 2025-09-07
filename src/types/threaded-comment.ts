import { User } from "./authentication";

export type ThreadedComment = {
  id: number;
  parentId: number | null;
  commenter: User;
  createdAt: string;
  updatedAt: string;
  isSpoiler: boolean;
  voters: string[];
  voteCount: number;
  message: string;
  childComments: ThreadedComment[];
};

export type CommentInput = {
  message: string;
  isSpoiler: boolean;
  parentCommentId: number | null;
}