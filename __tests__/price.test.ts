import {
  formatNumber,
  humanizeNumber,
  priceChangeColor,
} from '../src/utils/price';

describe('priceChangeColor', () => {
  it('should return green if the percentage is greater than 0', () => {
    expect(priceChangeColor(0.5)).toBe('#00C805');
    expect(priceChangeColor(1)).toBe('#00C805');
    expect(priceChangeColor(10)).toBe('#00C805');
  });

  it('should return red if the percentage is less than or equal to 0', () => {
    expect(priceChangeColor(-0.5)).toBe('#FF0000');
    expect(priceChangeColor(0)).toBe('#FF0000');
    expect(priceChangeColor(-10)).toBe('#FF0000');
  });
});

describe('humanizeNumber', () => {
  it('should return the number in billion format if it is greater than or equal to 1 billion', () => {
    expect(humanizeNumber(1_000_000_000)).toBe('1.00B');
    expect(humanizeNumber(2_500_000_000)).toBe('2.50B');
  });

  it('should return the number in million format if it is greater than or equal to 1 million', () => {
    expect(humanizeNumber(1_000_000)).toBe('1.00M');
    expect(humanizeNumber(2_500_000)).toBe('2.50M');
  });

  it('should return the number in thousand format if it is greater than or equal to 1 thousand', () => {
    expect(humanizeNumber(1_000)).toBe('1.00K');
    expect(humanizeNumber(2_500)).toBe('2.50K');
  });

  it('should return the number as is if it is less than 1 thousand', () => {
    expect(humanizeNumber(500)).toBe('500');
    expect(humanizeNumber(999)).toBe('999');
  });
});

describe('formatNumber', () => {
  it('should return the formatted price with currency symbol', () => {
    expect(formatNumber(100)).toBe('$100.00');
    expect(formatNumber(100, '€')).toBe('€100.00');
  });

  it('should return the formatted price with currency symbol and humanized number', () => {
    expect(formatNumber(1_000_000_000, '$', true)).toBe('$1.00B');
    expect(formatNumber(1_000_000, '€', true)).toBe('€1.00M');
  });

  it('should return "N/A" if the price is falsy', () => {
    expect(formatNumber(null)).toBe('N/A');
    expect(formatNumber(undefined)).toBe('N/A');
    expect(formatNumber(0)).toBe('N/A');
    expect(formatNumber('')).toBe('N/A');
  });
});
