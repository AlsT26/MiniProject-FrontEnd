const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvent = async () => {
  console.log("test get event");
  const res = await fetch(`${base_url}/event`, {
    next: { revalidate: 0 },
  });
  const data = await res.json();

  return data?.events;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/event/${slug}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    console.error(`Failed to fetch event ${slug}:`, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.event ? [data.event] : [];
};

export const getCategory = async (category: string) => {
  const res = await fetch(`${base_url}/event/category/${category}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    console.error(`Failed to fetch event with ${category}:`, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.event;
};
