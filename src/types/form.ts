export const EVENT_CATEGORIES = ["Sport", "Entertainment", "Comedy", "Horror", "Kids", "Adults", "Tech", "Food", "Free", "Paid", "Game"] as const;

export interface IEventForm {
  event_title: string;
  event_description: string;
  event_category: (typeof EVENT_CATEGORIES)[number];
  event_location: string;
  event_venue: string;
  event_dateTime: string;
  thumbnail: File | null;
}
