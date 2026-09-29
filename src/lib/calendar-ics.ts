/**
 * LuxeEstate - iCalendar (.ics) RFC 5545 Generator
 * Cho phép tạo file lịch để đính kèm email hoặc tải trực tiếp vào Google/Apple/Outlook Calendar.
 */

export interface CalendarEventOptions {
  title: string;
  description: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  durationMinutes?: number;
  organizerName?: string;
  organizerEmail?: string;
}

/**
 * Định dạng ngày giờ thành chuẩn UTC iCalendar: YYYYMMDDTHHMMSSZ
 */
function formatICSDate(dateStr: string, timeStr: string, offsetMinutes: number = 0): string {
  // Giả định múi giờ Việt Nam UTC+7
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  const d = new Date(Date.UTC(year, month - 1, day, hours - 7, minutes + offsetMinutes));
  
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

export function generateICalendar(options: CalendarEventOptions): string {
  const {
    title,
    description,
    location,
    date,
    time,
    durationMinutes = 60,
    organizerName = 'LuxeEstate Vietnam',
    organizerEmail = 'concierge@luxeestate.vn',
  } = options;

  const dtStart = formatICSDate(date, time, 0);
  const dtEnd = formatICSDate(date, time, durationMinutes);
  const dtStamp = formatICSDate(new Date().toISOString().slice(0, 10), '12:00', 0);
  const uid = `luxe-viewing-${date.replace(/-/g, '')}-${time.replace(':', '')}-${Date.now()}@luxeestate.vn`;

  // Chuẩn hóa ký tự theo chuẩn RFC 5545
  const cleanSummary = title.replace(/\n/g, ' ');
  const cleanDescription = description.replace(/\n/g, '\\n');
  const cleanLocation = location.replace(/\n/g, ' ');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LuxeEstate//Luxury Viewing Schedule//VN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    `ORGANIZER;CN=${organizerName}:mailto:${organizerEmail}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nhắc nhở lịch hẹn xem nhà LuxeEstate trong 2 giờ tới',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
