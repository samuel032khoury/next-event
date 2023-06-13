import { commentValidator } from "@/lib/validations/comment";
import { nanoid } from "nanoid";
import {setFirestoreDoc} from "@/lib/firestore";

interface EventCommentProp {
  params: {
    eventId: string;
  };
}

export async function GET(
) {

  return new Response("OK");
}

export async function POST(
  req: Request,
  { params: { eventId } }: EventCommentProp
) {
  const body = await req.json();
  const { name, email, text } = commentValidator.parse(body);
  if (!name || !email || !text) {
    return new Response("Invalid Form Data", { status: 422 });
  }

  const comment: EventComment = {
    id: nanoid(),
    email,
    name,
    text,
  };

  await setFirestoreDoc(`events/${eventId}/comments`, comment.id, comment)

  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: {
      "Content-type": "application/json",
    },
  });
}
