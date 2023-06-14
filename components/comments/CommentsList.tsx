"use client";
import { useGetData } from "@/lib/hooks/useGetData";

export default function CommentsList() {
  const data = useGetData<EventComment[]>("/api/comments/e1");

  if (data) {
    return (
      <div className="center">
        <ul>
          {data.map((e) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}
