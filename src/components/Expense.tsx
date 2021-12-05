import styled from 'styled-components';
import { formatRoman } from 'lib/formatRoman';
import { formatMoney } from 'lib/formatMoney';

type ExpenseProps = {
	index: number;
	name: string,
	price: number;
	place: string;
}

export default function Expense({ index, name, price, place }: ExpenseProps) {
	return (
		<tr>
			<YellowTd align="center">{formatRoman(index)}</YellowTd>
			<YellowTd align="left">{name}</YellowTd>
			<YellowTd align="left">{formatMoney(price)}</YellowTd>
			<YellowTd align="left">{place}</YellowTd>
		</tr>
	);
}

const YellowTd = styled.td`
	background: #ffff00;
	color: #000;
	text-align: ${props => props.align};
`;