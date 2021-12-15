import { useState } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			maxWidth: 300
		},
		button: {
			marginTop: theme.spacing(3),
			maxWidth: 300
		}
	})
)

type Data = {
	date: string;
	income: number;
	expenses: {
		id: number;
		name: string;
		price: number;
		place: string;
	}[];
}[];

type FormProps = {
	data: Data;
	setData: (data: Data) => void;
};

export default function Form({ data, setData }: FormProps) {
	const [date, setDate] = useState<Date | null>(new Date());
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [place, setPlace] = useState('');
	const [income, setIncome] = useState(0);
	const classes = useStyles();

	const handleAdd = (): void => {
		// 예외 처리
		if (!date) {
			return;
		}
		if (isNaN(Number(price))) {
			return;
		}

		// ** getYear가 아닌 getFullYear가 웹 표준으로 바뀜
		const year = date.getFullYear().toString();
		const month = String(date.getMonth() + 1); // (1을 더해주는 과정에서 toString을 붙이기 곤란하기 때문에 String 사용)
		const day = date.getDate().toString();

		// month와 day가 두 자리 숫자이면 그대로 반환하고 한 자리이면 앞에 '0'을 붙임
		const strDate = year + (month[1] ? month : "0" + month) + (day[1] ? day : "0" + day);

		// maxId 구하기: 추가나 수정 시 해당 데이터를 맨 뒤(또는 맨 앞)로 보내기 위해
		const maxId = data.reduce((acc, daily) => {
			const maxDailyId = daily.expenses.reduce((acc, expense) => (
				expense.id > acc ? expense.id : acc
			), 0);
			return maxDailyId > acc ? maxDailyId : acc;
		}, 0);
		
		// 사용자가 입력한 date와 일치하는 date가 있는지 여부를 index로 조사 
		const selectDailyIndex = data.findIndex(daily => daily.date === strDate);

		// 기존 data에 없으면 새로 추가
		if (selectDailyIndex === -1) {
			setData([
				// 기존 data에
				...data,
				// 새 daily를 넣어줌
				{
					date: strDate, // 날짜는 사용자가 입력한 날짜
					income: income, 
					expenses: [ // 비용은 배열 안에 객체로
						{
							id: maxId + 1, // id는 맨 뒤 id에 +1
							name, // 입력한 이름
							price: Number(price), // 입력한 가격(을 숫자 타입으로 바꾼 것)
							place // 입력한 구입처
						}
					]
				}
			])
			// 기존 data에 이미 있으면 기존꺼 수정
		} else {
			// 입력한 date와 다른 daily들은 싹 모아서 따로 담아두기
			const filteredDaily = data.filter(daily => daily.date !== strDate);
			// 입력한 날짜의 daily 객체를 index를 이용해 따로 분리
			const selectedDaily = data[selectDailyIndex];
			
			// 입력한 내용을 바탕으로 expenses와 income 추가
			selectedDaily.expenses.push({
				id: maxId + 1,
				name,
				price: Number(price),
				place
			});

			selectedDaily.income = Number(income);
			// 따로 떼놓았던 기존 daily들과 함께 수정한 daily를 넣어줌
			setData([...filteredDaily, selectedDaily]);
			

			console.log(selectedDaily.income);
			console.log(data)
		}

		setName('');
		setPrice('');
		setPlace('');
		setIncome(0);
	}

	return (
		<Wrapper>
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
				<KeyboardDatePicker
					variant="inline"
					margin="normal"
					fullWidth
					className={classes.textField}
					value={date}
					onChange={(date: Date | null) => setDate(date)}
					format="yyyy/MM/dd"
					label="날짜"
					inputVariant="outlined"
					autoOk
				/>
			</MuiPickersUtilsProvider>
			<br />
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				className={classes.textField}
				label="품목"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<br />
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				className={classes.textField}
				label="가격"
				value={price}
				onChange={e => setPrice(e.target.value)}
			/>
			<br />
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				className={classes.textField}
				label="구입처"
				value={place}
				onChange={e => setPlace(e.target.value)}
			/>
			<br />
			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				className={classes.textField}
				label="수입"
				value={income}
				onChange={e => {
					if (isNaN(Number(e.target.value))) return;
					setIncome(Number(e.target.value));
				}}
			/>
			<br />
			<Button
				onClick={() => handleAdd()}
				variant="contained"
				color="primary"
				fullWidth
				className={classes.button}
			>
				추가
			</Button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	flex: 1;
	text-align: center;
	margin: 0 40px;
	background: lightyellow;
`;