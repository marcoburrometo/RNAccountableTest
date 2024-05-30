export const dayMonthDate = (date: Date) => {
  if (!date) {
    return '';
  }
  return (
    ('00' + date?.getDate()).slice(-2) +
    '/' +
    ('00' + date?.getMonth() + 1).slice(-2)
  );
};
