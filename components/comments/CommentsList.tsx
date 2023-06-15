"use client";
import { useGetData } from "@/lib/hooks/useGetData";
import { FC, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
interface CommentsListProps {
  eid: string;
}
const CommentsList: FC<CommentsListProps> = ({ eid }: CommentsListProps) => {
  const initCommentList = useGetData<EventComment[]>(`/api/comments/${eid}`);
  const [commentList, setCommentList] = useState<EventComment[]>([]);

  useEffect(() => {
    initCommentList && setCommentList(initCommentList);
  }, [initCommentList]);

  useEffect(() => {
    pusherClient.subscribe(`comments@${eid}`);

    const commentHandler = (comment: EventComment) => {
      setCommentList(prevState => [comment,...prevState]);
    };
    pusherClient.bind("event-new-comment", commentHandler);
    return () => {
      pusherClient.unsubscribe(`comments@${eid}`);
      pusherClient.unbind("chat-new-message", commentHandler);
    };
  }, [eid]);

  if (commentList?.length) {
    return (
      <div className="max-w-lg lg:max-w-2xl w-full">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-600"
        >
          {commentList.map((comment) => (
            <li key={comment.id} className="py-4 flex">
              <div className="ml-3 w-full">
                <div className="text-sm font-semibold text-current flex">
                  <span className={"flex-1"}>
                    <span
                      className={
                        "underline decoration-blue-400 dark:decoration-yellow-400"
                      }
                      onClick={() => {
                        confirm(`Email ${comment.name}?`) &&
                          location.assign(`mailto:${comment.email}`);
                      }}
                    >
                      {comment.name}
                    </span>
                    <span className={"font-light"}> commented</span>
                  </span>
                  <span>
                    {new Date(comment.timeStamp).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  {comment.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <h1>No comments yet...</h1>;
};

export default CommentsList;
