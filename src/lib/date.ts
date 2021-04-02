export const formatDate = (date: string) => {
  const theDate = new Date(date);
  const month = `${theDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${theDate.getDate()}`.padStart(2, '0');

  return `${month}월 ${day}일`;
};
