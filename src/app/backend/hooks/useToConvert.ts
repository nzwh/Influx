import { DateTime } from 'luxon';

export const ToTitleCase = (value: string, initial?: boolean) => {
  return value.split(initial ? /_| / : '_') 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export const ToRelativeTime = (value: Date) => {
  return ToTitleCase(
    DateTime.fromJSDate(value).toRelativeCalendar() || ""
  );
};

export const ToMonetary = (value: number) => {
  
  if (value >= 1000000) {
    const formattedValue = (value / 1000000).toFixed(2);
    return `${formattedValue}M`;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};