import { isBefore, format } from 'date-fns';

export const today = format(new Date(), 'yyyy-MM-dd');

export const isLate = (date: string): boolean => {
  const [year, month, day] = spliteDate(date);
  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  return isBefore(dueDate, today);
};

const spliteDate = (date: string): string[] => {
  return date.split('-');
};
