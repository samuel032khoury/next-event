import { emailValidator } from "@/lib/validations/email";
import { setFirestoreDoc } from "@/lib/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = emailValidator.parse(body.email);
  if (!email) return new Response("Invalid email", { status: 422 });
  try {
    await setFirestoreDoc("newsletters", email);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
  return new Response("OK");
}
