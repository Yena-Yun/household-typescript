// 아라비아 숫자를 로마 숫자로 바꿔주는 함수
export const formatRoman = (num: number): string => {
	let roman = "";
	const romanNumList: { [key: string]: number } = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XV: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};

	let a;

	for (let key in romanNumList) {
		a = Math.floor(num / romanNumList[key]);

		if (a >= 0) {
			for (let i = 0; i < a; i++) {
				roman += key;
			}
		}
		
		num = num % romanNumList[key];
	}

	return roman;
};
