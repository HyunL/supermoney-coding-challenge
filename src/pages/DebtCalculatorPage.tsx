import { FC, useState } from "react";
import styled from "styled-components";

import { Debt } from "../types/debt";
import DebtInput from "../components/DebtInput";
import ButtonSecondary from "../components/ButtonSecondary";

const DebtCalculatorPage: FC = () => {
  const [savingsCalculated, setSavingsCalculated] = useState<boolean>(false);
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: 1,
      name: "Credit Card",
      amount: "5000",
      apr: "15.5",
      monthlyPayment: "300",
    },
    {
      id: 2,
      name: "Medical",
      amount: "1000",
      apr: "11.25",
      monthlyPayment: "150",
    },
  ]);

  const onCalculate = (debts: Debt[]) => {
    setSavingsCalculated(true);
    console.log(debts);
  };

  const onBackClicked = () => {
    setSavingsCalculated(false);
  };

  return (
    <Container>
      <Title>Debt Consolidation Savings Calculator</Title>
      <Instructions>
        Enter the details of your current unsecured debt and see how much you
        may be able to save after consolidating the debts into a single loan.
        Only include credit card debt, medical debt, personal loan debt, and
        other types of unsecured debt.
      </Instructions>
      {!savingsCalculated ? (
        <DebtInput
          setDebts={setDebts}
          debts={debts}
          onCalculate={onCalculate}
        />
      ) : (
        <ButtonSecondary onClick={onBackClicked}>
          &#x2190; Update Your Current Debts
        </ButtonSecondary>
      )}
    </Container>
  );
};

const Container = styled.section`
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
  padding: 1rem;
  background: #fafafa;
  border-radius: 4px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Instructions = styled.p`
  margin-top: 0;
  margin-bottom: 2em;
  color: #666;
`;

export default DebtCalculatorPage;
