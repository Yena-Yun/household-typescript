import { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from 'lib/formatDate';
import { formatMoney } from 'lib/formatMoney';
import EditIcon from '@mui/icons-material/Edit';

type DailyProps = {
	index: number;
	date: string;
	income: number;
	total: number;
	children: JSX.Element[];
	modify: number;
	setModify: (modify: number) => void;
	onModify: (index: number, income: number) => void;
}

type LimeTdProps = {
	minus?: boolean;
}

export default function Daily({ index, date, income, total, children, modify, setModify, onModify }: DailyProps) {
	const [incomeValue, setIncomeValue] = useState(String(income));

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onModify(index, Number(incomeValue));
			setModify(0);
		}
	};

	return (
		<tbody>
			<tr>
				<IndexTd align="center" rowSpan={children.length + 5}>{index}</IndexTd>
				<GreenTd align="center">날짜: {formatDate(date)}</GreenTd>
				<GreenTd align="center">수입</GreenTd>
				<GreenTd align="left" colSpan={2}>
					{modify ? (
						<IncomeTextField
							value={incomeValue}
							type="number"
							onChange={(e) => setIncomeValue(e.target.value)}
							onKeyDown={handleKeyDown}
							autoFocus
						/>
					) : (
						<>
							{formatMoney(income)}{" "}
							<ModifyButton onClick={() => setModify(index)}>
								<EditIcon />
							</ModifyButton>
						</>
					)}
					</GreenTd>
			</tr>
			<tr>
				<GreenTd align="center">번호</GreenTd>
				<GreenTd align="center">품목</GreenTd>
				<GreenTd align="center">가격</GreenTd>
				<GreenTd align="center">구입처</GreenTd>
			</tr>
			{children}
			<tr>
				<LimeTd align="center">개수</LimeTd>
				<LimeTd align="left" colSpan={3}>{children.length}</LimeTd>
			</tr>
			<tr>
				<LimeTd align="center">총지출</LimeTd>
				<LimeTd align="left" colSpan={3}>{formatMoney(total)}</LimeTd>
			</tr>
			<tr>
				<LimeTd align="center">잔액</LimeTd>
				<LimeTd align="left" colSpan={3} minus={income < total}>
					{income < total ? '[적자]' : null}
					{formatMoney(income - total)}
				</LimeTd>
			</tr>
		</tbody>
	);
}

const IndexTd = styled.td`
	background: #0000ff;
	color: #fff;
`;

const GreenTd = styled.td`
	background: #00ff00;
	color: #000;
	text-align: ${props => props.align};
`;

const LimeTd = styled.td<LimeTdProps>`
	background: #bfff00;
	color: ${props => (props.minus ? "#ff0000" : "#000")};
	text-align: ${props => props.align};
`;

const ModifyButton = styled.div`
	font-size: 1rem;
	float: right;
	display: none;
	cursor: pointer;
`;

const IncomeTextField = styled.input`
	border: none;
	background: transparent;
	width: 100%;
	font-size: 1rem;
`;