import styled from 'styled-components';

type HouseholdProps = {
	children: JSX.Element[];
}

export default function Household({ children }: HouseholdProps) {
	return (
		<Wrapper>
			<Title>수입지출 내역</Title>
			<HouseholdTable>
				{children}
			</HouseholdTable>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	flex: 1;
	margin: 0 0 0 20px;
`;

const HouseholdTable = styled.table`
	width: 420px;
`;

const Title = styled.div`
	font-weight: 700;
	/* text-align: center; */
	margin: 12px 0 8px;
`;