import colors from '../consts/Colors';

export const priceChangeColor = (percentage: number) =>
  percentage > 0 ? colors.green : colors.red;

export const humanizeNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }

  return num.toString();
};

export const formatNumber = (price: number, currency = '$', humanize = false) =>
  price
    ? `${
        humanize ? humanizeNumber(price) : price.toFixed(2)
      } ${currency.toUpperCase()}`
    : 'N/A';
