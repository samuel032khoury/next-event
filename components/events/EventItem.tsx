import { FC } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight, CalendarClock, MapPin } from "lucide-react";

interface EventItemProps {
  event: UpcomingEvent;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const { id: eid, title, image, date, location } = event;
  const dateLocale = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replaceAll(", ", "\n");
  return (
    <li
      className={
        "flex flex-col md:flex-row border-zinc-500 dark:border-slate-950 border-2 bg-white dark:bg-slate-700 " +
        "gap-4 items-center my-4 rounded-2xl  overflow-hidden"
      }
    >
      <div
        id={`${eid}-image-container`}
        className={"relative w-96 h-72 mt-6 md:mt-0"}
      >
        <Image
          src={image}
          alt={`${title} image`}
          className={"object-cover rounded-2xl md:rounded-none"}
          loading={"lazy"}
          fill
          sizes={'55vw'}
        />
      </div>
      <div
        id={`${eid}-info-container`}
        className={"leading-tight w-full mb-4 md:mb-0 text-center md:text-left"}
      >
        <div id={`${eid}-static-info`} className={"border-green-500"}>
          <h2 className={"text-2xl font-bold m-3 md:m-0 md:mb-3"}>{title}</h2>
          <div
            className={
              "flex items-center justify-center md:justify-start gap-2 text-zinc-500 dark:text-zinc-50 font-semibold"
            }
          >
            <CalendarClock className={"w-5 h-5"} />
            <time>{dateLocale}</time>
          </div>
          <div
            className={
              "flex items-center justify-center md:justify-start gap-2 whitespace-pre my-2 text-zinc-500 dark:text-zinc-50"
            }
          >
            <MapPin className={"w-5 h-5"} />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div id={"action"} className={"block"}>
          <div
            className={
              "flex flex-col align-middle md:justify-end md:flex-row p-4"
            }
          >
            <Button link={`/events/${eid}`}>
              <div className={"flex justify-center"}>
                <span>Explore Event</span>
                <span className={"pl-3 hidden md:block"}>
                  <ArrowRight className={"w-5 h-5"} />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
