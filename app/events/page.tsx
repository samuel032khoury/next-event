import { notFound } from "next/navigation";
import AllEvents from "@/app/events/AllEvents";
import FilteredEvents from "@/app/events/FilteredEvents";

interface EventsProps {
  searchParams: {
    year?: string;
    month?: string;
  };
}

const Events = async ({ searchParams }: EventsProps) => {
  const {year, month} = searchParams;
  if (year) {
    if (month) {
      return FilteredEvents(+year, +month);
    }
    notFound();
  }
  return AllEvents();
};

export default Events;
