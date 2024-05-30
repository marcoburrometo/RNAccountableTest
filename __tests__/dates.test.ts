import {dayMonthDate} from '../src/utils/dates';

describe('dayMonthDate', () => {
  it('should return an empty string if the input date is falsy', () => {
    expect(dayMonthDate(null)).toBe('');
    expect(dayMonthDate(undefined)).toBe('');
    expect(dayMonthDate(false)).toBe('');
    expect(dayMonthDate(0)).toBe('');
    expect(dayMonthDate('')).toBe('');
  });

  it('should return the formatted day and month', () => {
    expect(dayMonthDate(new Date('2022-01-01'))).toBe('01/01');
    expect(dayMonthDate(new Date('2022-11-20'))).toBe('20/11');
    expect(dayMonthDate(new Date('2022-06-15'))).toBe('15/06');
  });
});
