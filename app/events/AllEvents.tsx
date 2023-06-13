import { fetchAllEvents } from "@/lib/utils";
import EventSearch from "@/components/events/EventSearch";
import EventList from "@/components/events/EventList";

export const metadata = {
  title: "All Events",
  description: "All events page",
};
const AllEvents = async () => {
  const featuredEvents = await fetchAllEvents();
  return (
    <div>
      <EventSearch />
      <EventList events={featuredEvents} />
    </div>
  );
};

export default AllEvents;
