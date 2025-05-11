export const HOUR_WIDTH = 200;
export const TIMELINE_START_HOUR = 6;
export const TIMELINE_END_HOUR = 23;
export const TOTAL_HOURS = TIMELINE_END_HOUR - TIMELINE_START_HOUR + 1;

export const getTimePosition = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hour] = time.split(':').map(Number);
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) hour24 += 12;
    if (period === 'AM' && hour === 12) hour24 = 0;
    return (hour24 - TIMELINE_START_HOUR) * HOUR_WIDTH;
  };
  
  export const getActivityDuration = (startTime: string, endTime: string): number => {
    const startPos = getTimePosition(startTime);
    const endPos = getTimePosition(endTime);
    return endPos - startPos;
  };
  
  export const generateTimeSlots = (): string[] => {
    const timeSlots = [];
    for (let hour = TIMELINE_START_HOUR; hour <= TIMELINE_END_HOUR; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour12;
      timeSlots.push(`${displayHour}:00 ${ampm}`);
    }
    return timeSlots;
  };