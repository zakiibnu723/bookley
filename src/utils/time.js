export function parseTimeString(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  return [hour, minute];
}

export function formatTime(hour, minute) {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function generateTimeSlots(
  partnerOpeningHours, // array 7 hari dari partner.opening_hours
  staffList,           // array staff, tiap staff.opening_hours array 7 hari
  dayName,             // nama hari, ex: "Senin"
  duration,            // durasi slot (menit)
  bookings = []
) {
  // Cari data hari yang dipilih pada partner
  const partnerDay = (partnerOpeningHours || []).find(d => d.day === dayName);
  if (!partnerDay || !partnerDay.is_open) {
    return [{ reason: "partner_closed" }];
  }

  const open = parseTimeString(partnerDay.open_time);
  const close = parseTimeString(partnerDay.close_time);

  if (!duration || duration <= 0) return [];
  const slots = [];
  let [hour, minute] = open;
  const [closeHour, closeMinute] = close;
  let loopCount = 0;
  const maxLoop = 1000;

  while (hour < closeHour || (hour === closeHour && minute <= closeMinute)) {
    const start = formatTime(hour, minute);
    let endMinute = minute + duration;
    let endHour = hour;
    if (endMinute >= 60) {
      endHour += Math.floor(endMinute / 60);
      endMinute = endMinute % 60;
    }
    if (endHour > closeHour || (endHour === closeHour && endMinute > closeMinute)) break;
    const end = formatTime(endHour, endMinute);

    // Cari bookings yang overlap dengan slot ini
    const overlappingBookings = bookings.filter(
      (b) => isSlotOverlap(start, end, b.start, b.duration)
    );

    // Staff yang sedang on duty di slot ini (dan is_open hari ini)
    const availableStaffs = staffList.filter(staff => {
      const staffDay = (staff.opening_hours || []).find(d => d.day === dayName);
      if (!staffDay || !staffDay.is_open) return false;
      const [soh, som] = staffDay.open_time.split(":").map(Number);
      const [sch, scm] = staffDay.close_time.split(":").map(Number);
      const slotStartMin = hour * 60 + minute;
      const slotEndMin = endHour * 60 + endMinute;
      const staffOpenMin = soh * 60 + som;
      const staffCloseMin = sch * 60 + scm;
      // Staff harus available sepanjang slot
      return slotStartMin >= staffOpenMin && slotEndMin <= staffCloseMin;
    });

    // Staff yang sudah terpakai di slot ini
    const bookedStaffIds = overlappingBookings.map(b => b.staff_id);
    // Staff yang available dan belum terbooking di slot ini
    const trulyAvailableStaffs = availableStaffs.filter(staff => !bookedStaffIds.includes(staff.id));

    slots.push({
      time: start,
      end,
      available: trulyAvailableStaffs.length > 0,
      booked: trulyAvailableStaffs.length === 0,
      overlapCount: overlappingBookings.length,
      availableStaffs: trulyAvailableStaffs,
    });

    hour = endHour;
    minute = endMinute;
    loopCount++;
    if (loopCount > maxLoop) break; // proteksi infinite loop
  }
  return slots;
}

// Helper untuk cek overlap slot
export function isSlotOverlap(slotStart, slotEnd, bookingStart, bookingDuration) {
  // slotStart, slotEnd, bookingStart: "HH:mm", bookingDuration: menit
  const [sh, sm] = slotStart.split(":").map(Number);
  const [eh, em] = slotEnd.split(":").map(Number);
  const [bh, bm] = bookingStart.split(":").map(Number);

  const slotStartMin = sh * 60 + sm;
  const slotEndMin = eh * 60 + em;
  const bookingStartMin = bh * 60 + bm;
  const bookingEndMin = bookingStartMin + bookingDuration;

  // Overlap jika slotStart < bookingEnd && slotEnd > bookingStart
  return slotStartMin < bookingEndMin && slotEndMin > bookingStartMin;
}