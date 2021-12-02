// 날짜 형식을 YYYY/MM/DD 형태로 바꿔주는 함수
export const formatDate = (date: string): string => {
	const year = date.substr(0, 4);
	const month = date.substr(4, 2);
	const day = date.substr(6, 2);
	return year + '/' + month + '/' + day;
};