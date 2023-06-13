import { notFound } from "next/navigation";
import { getFilteredEvents } from "@/lib/utils";
import EventList from "@/components/events/EventList";
import { FC } from "react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Filtered Events",
};

const FilteredEvents = async (year: number, month: number) => {
  if (!year || !month || month < 1 || month > 12) notFound();

  const filteredEvents = await getFilteredEvents({ year, month });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className={"flex flex-col items-center h-[85vh]"}>
        <ResultsTitle date={{ year, month }} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-3xl">No events found...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ResultsTitle date={{ year, month }} />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default FilteredEvents;

interface ResultsTitleProps {
  date: { year: number; month: number };
}

const ResultsTitle: FC<ResultsTitleProps> = ({
  date: { year, month },
}: ResultsTitleProps) => {
  const readableDate = new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <section
      className={
        "flex flex-col gap-2 mb-8 mx-auto w-11/12 max-w-2xl text-center items-center"
      }
    >
      <h1 className={"text-2xl font-semibold"}>Showing events in {readableDate}</h1>
      <Button link={"/events"} className={"text-xl w-1/2 justify-center"}>
        Browse all events
      </Button>
    </section>
  );
};
