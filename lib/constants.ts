import { formatDate } from './utils';

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};

const DEPARTURE = {
  label: 'Manila (MNL)',
  value: 'MNL',
};

const ARRIVAL = {
  label: 'Singapore (SIN)',
  value: 'SIN',
};

const getToday = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

const getOneWeekFromNow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 8);
  return formatDate(date);
};

export const SEARCH_VALUES = {
  departure: DEPARTURE,
  arrival: ARRIVAL,
  today: getToday(),
  oneWeekFromNow: getOneWeekFromNow(),
};
