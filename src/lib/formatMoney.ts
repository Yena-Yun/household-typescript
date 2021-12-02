// 금액에 천원 단위로 쉼표를 찍어주는 함수
export const formatMoney = (money: number): string => {
	return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}