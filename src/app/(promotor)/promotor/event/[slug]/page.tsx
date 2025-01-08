"use client";
import { notFound } from "next/navigation";
import EventDetails from "@/components/EventDetailPromotor";
import { getEventSlug } from "@/app/libs/event";
import MyComponent from "@/components/statistic";
import adminGuard from "@/hoc/adminGuard";

interface EventPageProps {
  params: {
    slug: string;
  };
}

async function EventPage({ params }: EventPageProps) {
  const { slug } = params;

  const event = await getEventSlug(slug);

  if (!event || event.length === 0) {
    notFound();
  }

  const { name, email, avatar } = event[0].promotor;
  const eventData = event[0];
  return (
    <>
      <div>
        <div>
          <EventDetails
            title={eventData.title}
            description={eventData.description}
            thumbnail={eventData.thumbnail}
            category={eventData.category}
            dateTime={eventData.dateTime}
            location={eventData.location}
            promotor={name}
            tickets={eventData.tickets}
          />
        </div>
        <div>
          <MyComponent slug={slug as string} />
        </div>
      </div>
    </>
  );
}
export default EventPage;
