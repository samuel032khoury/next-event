import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchAllEvents = async (
  lifetime: number = 180
): Promise<UpcomingEvent[]> => {
  const response = await fetch(
    "https://nextevent-b93d2-default-rtdb.firebaseio.com/events.json",
    {
      next: { revalidate: lifetime },
    }
  );
  const data = (await response.json()) as {
    [key: string]: Omit<UpcomingEvent, "id">;
  };

  const events = [] as UpcomingEvent[];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
};

export const getFeaturedEvents = async (): Promise<UpcomingEvent[]> => {
  const events = await fetchAllEvents(30);
  return events.filter((event) => event.isFeatured);
};

export const getEventById = async (
  eid: string
): Promise<UpcomingEvent | null> => {
  const response = await fetch(
    `https://nextevent-b93d2-default-rtdb.firebaseio.com/events/${eid}.json`,
    { next: { revalidate: 5 } }
  );
  const data = (await response.json()) as Omit<UpcomingEvent, "id"> | null;

  return data && { id: eid, ...data };
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const events = await fetchAllEvents();
  const { year, month } = dateFilter;
  return events.filter((event) => {
    const date = new Date(event.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
};
