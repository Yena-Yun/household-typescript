import styled from 'styled-components';
import { formatRoman } from 'lib/formatRoman';
import { formatMoney } from 'lib/formatMoney';

type ExpenseProps = {
	id: number;
	index: number;
	name: string,
	price: number;
	place: string;
	onRemove: (id: number) => void;
}

export default function Expense({ id, index, name, price, place, onRemove }: ExpenseProps) {
	return (
		<Wrapper>
			<ExpenseTd align="center">&nbsp;&nbsp;{formatRoman(index)}</ExpenseTd>
			<ExpenseTd align="left">&nbsp;&nbsp;{name}</ExpenseTd>
			<ExpenseTd align="left">&nbsp;&nbsp;{formatMoney(price)}</ExpenseTd>
			<ExpenseTd align="left">
				&nbsp;&nbsp;{place}
				{/* 삭제버튼 위치: 구입처 cell 내부 */}
				<RemoveButton onClick={() => onRemove(id)}>&times;</RemoveButton>
			</ExpenseTd>
		</Wrapper>
	);
}

const Wrapper = styled.tr``;

const RemoveButton = styled.div`
	color: #ff0000;
	float: right;
	margin: 0;
	padding: 0;
	cursor: pointer;

	// 처음엔 안 보였다가
	display: none;
	// Wrapper에 hover하면 보임
	${Wrapper}:hover & {
		display: block;
	}
`;

const ExpenseTd = styled.td`
	background: #ffff00;
	color: #000;
	text-align: ${props => props.align};
	padding: 4px 0;
`;