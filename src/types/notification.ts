type NotificationBase = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
}

export type NewReplyNotification = NotificationBase & {
  type: "NEW_REPLY";
  userReplying: string;
  replyCommentContent: string;
  parentCommentContent: string;
  uri: string;
}

export type NewChapterNotification = NotificationBase & {
  type: "NEW_CHAPTER";
  novelSlug: string;
  chapterSlug: string;
}

export type NotificationUnion =
  | NewChapterNotification
  | NewReplyNotification