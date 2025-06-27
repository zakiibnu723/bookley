export const DAYS = [
  "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
];

export function getDefaultOpeningHours() {
  return DAYS.map(day => ({
    day,
    is_open: true,
    open_time: "08:00",
    close_time: "22:00"
  }));
}