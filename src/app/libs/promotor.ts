const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const createEvent = async (formData: FormData) => {
  const res = await fetch(`${base_url}/promotor/event`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to create event: ${res.statusText}`);
  }
  return await res.json();
};
