import React, { FC, LiHTMLAttributes, Suspense } from "react";
import Image from "next/image";
import { CalendarIcon, LucideIcon, MapPin } from "lucide-react";
import NewCommentForm from "@/components/form/NewCommentForm";
import CommentsList from "@/components/comments/CommentsList";
import Spinner from "@/components/ui/Spinner";
interface EventDetailsProps {
  event: UpcomingEvent;
}

const EventDetails: FC<EventDetailsProps> = ({ event }: EventDetailsProps) => {
  const { id: eid, title, location, date, image, description } = event;
  const dateLocale = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replaceAll(", ", "\n");
  return (
    <div>
      <div
        id={"event-title"}
        className={
          "-mt-[2.18rem] w-full h-[10rem] lg:h-[20rem] bg-gradient-to-bl from-teal-600 to-cyan-800"
        }
      >
        <h1
          className={
            "m-0 pt-6 text-[2rem] lg:text-[5rem] text-center drop-shadow-2xl text-white"
          }
        >
          {title}
        </h1>
      </div>
      <div
        id={"event-summary"}
        className={
          "flex flex-col lg:flex-row gap-4 p-8 mx-auto -my-12 lg:-my-20 max-w-3xl w-4/5 text-white bg-gray-900 " +
          "shadow-lg rounded-xl justify-between lg:justify-center items-center lg:items-stretch"
        }
      >
        <div
          id={"image-container"}
          className={
            "relative w-40 lg:w-80 h-40 lg:h-80 rounded-full overflow-hidden border-4 bg-white"
          }
        >
          <Image
            src={image}
            alt={`${title}-image`}
            className={"object-cover"}
            loading={"lazy"}
            fill
            sizes={"55vw"}
          />
        </div>
        <ul
          id={"event-schedule"}
          className={
            "flex flex-col flex-[3] gap-8 justify-center items-center lg:items-start"
          }
        >
          <EventSchedule icon={CalendarIcon}>
            <time>{dateLocale}</time>
          </EventSchedule>
          <EventSchedule icon={MapPin}>
            <address className={"whitespace-pre"}>{formattedAddress}</address>
          </EventSchedule>
        </ul>
      </div>
      <div
        className={
          "text-2xl text-slate-800 dark:text-white w-11/12 max-w-lg lg:max-w-2xl m-auto mt-32"
        }
      >
        {description}
      </div>
      <div className="flex gap-3 justify-center items-center pt-8">
        <span className="text-lg font-semibold cursor-default">Comments</span>
        <div className="w-full max-w-lg lg:max-w-3xl border-b border-black mr-2 pt-0.5"></div>
      </div>
      <div className="flex justify-center items-center h-auto py-8">
        <Suspense fallback={<Spinner />}>
          <CommentsList eid={eid} />
        </Suspense>
      </div>
      <div className={"mt-4 flex flex-1 justify-center"}>
        <NewCommentForm />
      </div>
    </div>
  );
};

export default EventDetails;

interface EventScheduleProps extends LiHTMLAttributes<HTMLUListElement> {
  icon: LucideIcon;
}
const EventSchedule: FC<EventScheduleProps> = ({
  icon: Icon,
  children,
}: EventScheduleProps) => {
  return (
    <li
      className={
        "flex flex-col text-2xl text-teal-50 text-center lg:text-left items-center lg:items-start"
      }
    >
      <span className={"block mr-4 text-teal-400"}>
        <Icon className={"w-8 h-8"} />
      </span>
      <span className={"block"}>{children}</span>
    </li>
  );
};
