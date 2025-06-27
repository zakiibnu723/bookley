export function getNextDates(count = 7) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

export function getNextDateStrings(count = 7) {
  return getNextDates(count).map((d) => d.toISOString().slice(0, 10));
}

export function formatDateID(d, today = new Date()) {
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  if (isToday) {
    return `Hari ini, ${d.getDate()} ${d.toLocaleDateString("id-ID", {
      month: "short",
    })}`;
  }
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}