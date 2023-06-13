import { FC } from "react";
import EventItem from "@/components/events/EventItem";

interface EventListProps {
  events: UpcomingEvent[];
}


export const dynamic = 'force-dynamic';

const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <ul className={"w-3/4 m-20 items-center justify-center center"}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
