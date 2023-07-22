import { useMemo } from 'react';

const useMonetaryFormatter = () => {
  
  // Converts a number to a monetary value.
  const convertToMonetary = (value: number) => {
    if (value >= 1000000) {
      const formattedValue = (value / 1000000).toFixed(2);
      return `${formattedValue}M`;
    }	

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  return useMemo(() => convertToMonetary, []);
};

export default useMonetaryFormatter;