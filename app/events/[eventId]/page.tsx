import { notFound } from "next/navigation";
import EventDetails from "@/components/events/EventDetails";
import { getEventById, getFeaturedEvents } from "@/lib/utils";

export const dynamic = "force-static";
export const generateStaticParams = async () => {
  const events: UpcomingEvent[] = await getFeaturedEvents();
  return events.map((event) => ({ eventId: event.id, event }));
};

interface PageProps {
  params: {
    eventId: string;
  };
}

export const generateMetadata = async ({ params }: PageProps) => {
  const event = await getEventById(params.eventId);
  if (!event) return { title: "Something went wrong..." };
  return {
    title: event.title,
  };
};

const EventDetailsPage = async ({ params }: PageProps) => {
  const event = await getEventById(params.eventId);
  if (!event) notFound();
  return <EventDetails event={event} />;
};

export default EventDetailsPage;
