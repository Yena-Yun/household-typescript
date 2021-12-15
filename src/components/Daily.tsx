import { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from 'lib/formatDate';
import { formatMoney } from 'lib/formatMoney';
import EditIcon from "@material-ui/icons/Edit";

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
				<FieldTd align="center">{formatDate(date)}</FieldTd>
				<FieldTd align="center">수입</FieldTd>
				<IncomeTd align="left" colSpan={2}>
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
							&nbsp;&nbsp;{formatMoney(income)}{" "}
							<ModifyButton onClick={() => setModify(index)}>
								<EditIcon />
							</ModifyButton>
						</>
					)}
					</IncomeTd>
			</tr>
			<tr>
				<FieldTd align="center">번호</FieldTd>
				<FieldTd align="center">품목</FieldTd>
				<FieldTd align="center">가격</FieldTd>
				<FieldTd align="center">구입처</FieldTd>
			</tr>
			{children}
			<tr>
				<ResultTd align="center">개수</ResultTd>
				<ResultTd align="left" colSpan={3}>&nbsp;&nbsp;{children.length}</ResultTd>
			</tr>
			<tr>
				<ResultTd align="center">총지출</ResultTd>
				<ResultTd align="left" colSpan={3}>&nbsp;&nbsp;{formatMoney(total)}</ResultTd>
			</tr>
			<tr>
				<ResultTd align="center">잔액</ResultTd>
				<ResultTd align="left" colSpan={3} minus={income < total}>
					&nbsp;&nbsp;{income < total ? '[적자]' : null}
					{formatMoney(income - total)}
				</ResultTd>
			</tr>
		</tbody>
	);
}

const IndexTd = styled.td`
	background: #835151;
	color: #fff;
	text-align: ${props => props.align};
	padding: 0 4px;
`;

const FieldTd = styled.td`
	background: #c2f784;
	color: #000;
	text-align: ${props => props.align};
	padding: 4px 0;
`;

const ResultTd = styled.td<LimeTdProps>`
	background: #ffc1c1;
	color: ${props => (props.minus ? "#ff0000" : "#000")};
	text-align: ${props => props.align};
	padding: 4px 0;
`;

const ModifyButton = styled.div`
	float: right;
	display: none;
	cursor: pointer;
	margin: -3px 0;
`;

const IncomeTd = styled.td`
	background: #c2f784;
	color: #000;
	text-align: ${props => props.align};
	padding: 4px 0;

	// incomeTd에 hover하면 EditIcon 나타남
	&:hover ${ModifyButton} {
		display: block;
	}
`;

const IncomeTextField = styled.input`
	border: none;
	background: transparent;
	width: 150px;
	font-size: 1rem;
	margin: 1px;

	&:active {
		border: none;
		outline: none;
	}
`;