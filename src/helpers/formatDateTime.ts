// helpers/formatDateTime.ts
export function formatDateTime(dateTimeString: string): { date: string; time: string } {
  const dateTime = new Date(dateTimeString);

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = dateTime.toLocaleDateString(undefined, optionsDate); // Adjust locale as needed
  const formattedTime = dateTime.toLocaleTimeString(undefined, optionsTime);

  return { date: formattedDate, time: formattedTime };
}
