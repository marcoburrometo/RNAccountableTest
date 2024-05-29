import colors from '../consts/Colors';

export const priceChangeColor = (percentage: number) =>
  percentage > 0 ? colors.green : colors.red;
