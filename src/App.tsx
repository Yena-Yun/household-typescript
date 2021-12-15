import { useState } from 'react';
import styled from 'styled-components';
// useState의 data와 구분하기 위해 initialData로 선언 (=> useState data의 초기값)
import { data as initialData } from 'lib/data.json';
import Household from 'components/Household';
import Daily from 'components/Daily';
import Expense from 'components/Expense';
import Form from 'components/Form';

function App() {
  type DataType = {
    date: string;
    income: number;
    expenses: {
      id: number;
      name: string;
      price: number;
      place: string;
    }[];
  }[];

  // 로컬스토리지에서 data를 받아옴
  const localData = localStorage.getItem('data');

  // getData 
  // 로컬스토리지에서 받아온 data가 있으면 해당 데이터를 json화 한 값,
  // 없으면 data.json에서 가져온 초기 데이터(initialData)
  const getData: DataType = localData ? JSON.parse(localData) : initialData;

  const [data, setData] = useState(getData); // data의 초기값을 getData로 지정
  const [modify, setModify] = useState(0);

  // data를 날짜별로 정렬 후 
  const sortedData = data.sort((a, b) => {
    if (a.date > b.date) return -1;
    else if (b.date > a.date) return 1;
    else return 0;

  // map(daily)으로 꺼내면서 구입처별로 정렬한 객체를 반환
  }).map((daily) => {
    const sortedExpenses = daily.expenses.sort((a, b) => {
      if (a.place > b.place) return -1;
      else if (b.place > a.place) return 1;
      else return 0;
    });
    return {
      ...daily,
      expense: sortedExpenses
    }
  });

  // 삭제기능: id를 받아서 expense의 id가 일치하지 않는 daily 객체만 뽑은 뒤 setData에 전달
  const handleRemove = (id: number): void => {
    const removedData = data.map(daily => {
      // daily 객체를 반환
      return {
        // daily의 나머지 정보 (date, income)
        ...daily,
        // expenses의 경우 배열을 돌면서 받은 id와 일치하지 않는 expense만 모아서 반환
        expenses: daily.expenses.filter(expense => expense.id !== id)
      }
    });

    // 로컬스토리지에 문자열화 해서 넣어주고
    localStorage.setItem('data', JSON.stringify(removedData));

    // setData에도 넣어줌
    setData(removedData);
  };

  // 수정기능: index와 income을 받아서 data를 돌면서 
  // idx가 index - 1과 같은 daily면 그냥 반환, 같지 않은 daily면 기존 daily 정보에 income만 수정한 daily 객체 반환
  const handleModify = (index: number, income: number): void => {
    const modifiedData = data.map((daily, idx) =>
      // index = 어느 daily 객체인지 판별
      // data를 돌면서 받아온 index(- 1)와 다른 daily는 패스(그대로 반환)하고
      // 같은 daily를 찾으면 수정된 income을 추가해서 반환
      idx !== index - 1 ? daily : { ...daily, income }
    );

    // 로컬스토리지에 문자열화 해서 넣어주고
    localStorage.setItem('data', JSON.stringify(modifiedData));

    // setData에도 넣어줌
    setData(modifiedData);
  }

  return (
    <>
    <MainTitle>윤예나 님, 환영합니다!</MainTitle>
    <Container>
      <Form data={data} setData={setData} />
      <Household>
        {sortedData.map((daily, idx) => (
          <Daily
            key={idx}
            index={idx + 1}
            date={daily.date}
            income={daily.income}
            total={daily.expenses.reduce((acc, cur) => acc + cur.price, 0)}
            modify={modify}
            setModify={setModify}
            onModify={handleModify}
            >
            {daily.expenses.map((expense, idx) => (
              <Expense
                key={idx}
                id={expense.id}
                index={idx + 1}
                name={expense.name}
                price={expense.price}
                place={expense.place}
                onRemove={handleRemove}
              />
              ))}
          </Daily>
        ))}
      </Household>
    </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;

const MainTitle = styled.div`
  height: 60px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 2.7em;
  border-bottom: 1px solid #eee;
  margin: 0 0 16px;
`;

export default App;
