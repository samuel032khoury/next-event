import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/lib/utils";
import SubscribeForm from "@/components/form/SubscribeForm";
export default async function Home() {
  const featuredEvents = await getFeaturedEvents();
  return (
    <div className={"flex flex-col"}>
      <div className={"flex center"}>
        <h1 className={"text-4xl font-bold my-4"}>
          Here are some featured events!
        </h1>
      </div>
      <EventList events={featuredEvents} />
      <div className={"flex flex-col center"}>
        <h2 className={"text-2xl font-semibold my-4"}>
          Subscribe to stay updated!
        </h2>
        <SubscribeForm />
      </div>
    </div>
  );
}
