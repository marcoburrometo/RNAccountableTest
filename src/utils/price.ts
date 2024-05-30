import colors from '../consts/Colors';

export const priceChangeColor = (percentage: number) =>
  percentage > 0 ? colors.green : colors.red;

export const formatPrice = (price: number | undefined, currency = '$') =>
  price ? `${price.toFixed(2)} ${currency.toUpperCase()}` : 'N/A';
