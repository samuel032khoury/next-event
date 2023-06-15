import { commentValidator } from "@/lib/validations/comment";
import { nanoid } from "nanoid";
import { getFirestoreCollectionData, setFirestoreDoc } from "@/lib/firestore";
import { now } from "moment";
import { pusherServer } from "@/lib/pusher";

interface EventCommentProp {
  params: {
    eventId: string;
  };
}

export async function GET(
  _: Request,
  { params: { eventId } }: EventCommentProp
) {
  const eventComments = await getFirestoreCollectionData<EventComment>(
    `events/${eventId}/comments`
  );
  return new Response(JSON.stringify(eventComments), { status: 200 });
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
    timeStamp: now(),
    email,
    name,
    text,
  };

  try {
    await Promise.all([
      setFirestoreDoc(`events/${eventId}/comments`, comment.id, comment),
      pusherServer.trigger(
        `comments@${eventId}`,
        "event-new-comment",
        comment
      ),
    ]);
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: {
      "Content-type": "application/json",
    },
  });
}
