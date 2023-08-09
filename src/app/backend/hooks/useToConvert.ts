import { DateTime } from 'luxon';

export const useToTitleCase = (value: string, initial?: boolean) => {
  return value.split(initial ? /_| / : '_') 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export const useToRelativeTime = (value: Date) => {
  return useToTitleCase(
    DateTime.fromJSDate(value).toRelativeCalendar() || ""
  );
};

export const useToMonetary = (value: number) => {
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