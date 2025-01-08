import { notFound } from "next/navigation";
import { getEventSlug } from "../libs/event";
import EventDetails from "@/components/eventDetailProps";

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;

  const event = await getEventSlug(slug);

  if (!event || event.length === 0) {
    notFound();
    // return;
  }

  const { name, email, avatar } = event[0].promotor;
  const eventData = event[0];
  console.log("data event: asdoaishdoaishdoiashdoiashd", eventData);

  return (
    <>
      <div className="overflow-y-auto">
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
    </>
  );
}
