import dayjs from 'dayjs';

export const formatDateDDDMMM = ({ day, month, year }) => {
  return dayjs(`${year}-${month}-${day}`).format('ddd, D MMM');
};

export const stringDateToRangeObject = date => {
  const splittedStringDate = date.split('-');
  const dateObject = {
    year: Number(splittedStringDate[0]),
    month: Number(splittedStringDate[1]),
    day: Number(splittedStringDate[2]),
  };
  return dateObject;
};

export const formatDateDDDMMMFromString = date => {
  return dayjs(date).format('ddd, D MMM');
};

export const formatDateYYYMMddFromString = date => {
  return date.split('T')[0];
};

export const formatDateDDDMMMhmmFromString = date => {
  return dayjs(date).format('ddd, D MMM, h:mm A');
};
