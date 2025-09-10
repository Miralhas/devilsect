import { useVoteMutation } from "@/services/comments/client-mutations";
import { deleteVote } from "@/services/comments/server-actions";
import { User } from "@/types/authentication";
import { ThreadedComment, Vote } from "@/types/threaded-comment";
import { useState } from "react";

const useVote = ({ comment, user }: { comment: ThreadedComment; user?: User }) => {
  const [isVoter, setIsVoter] = useState<Vote | undefined>(comment.voters.find((v) => v.voter === user?.email));
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const isUpvoter = isVoter && isVoter.type === "UPVOTE";
  const isDownvoter = isVoter && isVoter.type === "DOWNVOTE";
  const isBackendVoter = comment.voters.find((v) => v.voter === user?.email);
  const isBackendUpvoter = isBackendVoter && isBackendVoter.type === "UPVOTE";
  const isBackendDownvoter = isBackendVoter && isBackendVoter.type === "DOWNVOTE";
  const voteMutation = useVoteMutation(comment.id);

  const onDeleteVote = () => {
    onDeleteUpvote();
    onDeleteDownvote();
  }

  const onDeleteUpvote = () => {
    if (isBackendDownvoter) {
      setIsVoter(undefined)
      setVoteCount(comment.voteCount + 1);
      onDeleteVoteMutation();
    } else onReset();
  }

  const onDeleteDownvote = () => {
    if (isBackendUpvoter) {
      setIsVoter(undefined)
      setVoteCount(comment.voteCount - 1);
      onDeleteVoteMutation();
    } else onReset();
  }

  const onReset = () => {
    setIsVoter(comment.voters.find((v) => v.voter === user?.email));
    setVoteCount(comment.voteCount);
  }

  const onDownVote = () => {
    if (user) {
      const vote: Vote = { type: "DOWNVOTE", voter: user.email };
      if (isDownvoter) {
        return onDeleteVote();
      } else if (isUpvoter) {
        onDeleteVote();
        onDownvoteMutation(vote)
      } else {
        onDownvoteMutation(vote)
      }
    }
  }

  const onUpVote = () => {
    if (user) {
      const vote: Vote = { type: "UPVOTE", voter: user.email };
      if (isUpvoter) {
        return onDeleteVote();
      } else if (isDownvoter) {
        onDeleteVote();
        onUpvoteMutation(vote);
      } else {
        onUpvoteMutation(vote);
      }
    }
  }

  const onDeleteVoteMutation = async () => {
    await deleteVote(comment.id)
  }

  const onUpvoteMutation = (vote: Vote) => {
    voteMutation.mutate(vote)
    setIsVoter(prev => prev?.type === vote.type ? undefined : vote);
    setVoteCount(prev => prev + 1);
  }

  const onDownvoteMutation = (vote: Vote) => {
    voteMutation.mutate(vote)
    setIsVoter(prev => prev?.type === vote.type ? undefined : vote);
    setVoteCount(prev => prev - 1);
  }

  return { onUpVote, onDownVote, voteCount, isDownvoter, isUpvoter };
}

export default useVote;
