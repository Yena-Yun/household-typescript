import React from 'react';
import { data } from './lib/data.json';
import Household from './components/Household';
import Daily from './components/Daily';
import Expense from './components/Expense';

function App() {
  return (
    <>
      <Household>
        {data.map((daily, idx) => (
          <Daily
            key={idx}
            index={idx + 1}
            date={daily.date}
            income={daily.income}
            total={daily.expenses.reduce((acc, cur) => acc + cur.price, 0)}
          >
            {daily.expenses.map((expense, idx) => (
              <Expense
                key={idx}
                index={idx + 1}
                name={expense.name}
                price={expense.price}
                place={expense.place}
              />
            ))}
            </Daily>
        ))}
      </Household>
    </>
  );
}

export default App;
