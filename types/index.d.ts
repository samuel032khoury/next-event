interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface EventComment {
  id: string;
  timeStamp: number;
  email: string;
  name: string;
  text: string;
}
