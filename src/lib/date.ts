export const formatDate = (date: string, isYear: boolean = false) => {
  const theDate = new Date(date);
  const year = `${theDate.getFullYear()}`;
  const month = `${theDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${theDate.getDate()}`.padStart(2, '0');

  return isYear ? `${year}년 ${month}월 ${day}일` : `${month}월 ${day}일`;
};
