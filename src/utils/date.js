export function getNextDates(count = 7) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

export function getNextDateStrings(count = 7) {
  return getNextDates(count).map(formatDateLocal);
}

export function formatDateLocal(d) {
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`;
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


export function getDayName(date) {
  return date.toLocaleDateString("id-ID", { weekday: "long" });
}

