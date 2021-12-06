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
			<YellowTd align="center">{formatRoman(index)}</YellowTd>
			<YellowTd align="left">{name}</YellowTd>
			<YellowTd align="left">{formatMoney(price)}</YellowTd>
			<YellowTd align="left">
				{place}
				<RemoveButton onClick={() => onRemove(id)}>&times;</RemoveButton>
			</YellowTd>
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
	// 안 보였다가
	display: none;
	// Wrapper에 hover하면 보임
	${Wrapper}:hover & {
		display: block;
	}
`;

const YellowTd = styled.td`
	background: #ffff00;
	color: #000;
	text-align: ${props => props.align};
`;