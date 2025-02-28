import { FC } from "react";
import styled from "styled-components";

import { Debt } from "../types/debt";
import DebtRowItem from "./DentRowItem";
import ButtonSecondary from "./ButtonSecondary";

interface DebtInputProps {
  onCalculate: (debts: Debt[]) => void;
  debts: Debt[];
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>;
}

const DebtInput: FC<DebtInputProps> = ({ onCalculate, debts, setDebts }) => {
  // Update a single debt field
  const handleDebtChange = (
    index: number,
    field: keyof Omit<Debt, "id">,
    value: string
  ) => {
    const updatedDebts = [...debts];
    updatedDebts[index][field] = value;
    setDebts(updatedDebts);
  };

  // Add a new debt row
  const addDebt = () => {
    setDebts((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        amount: "",
        apr: "",
        monthlyPayment: "",
      },
    ]);
  };

  // Remove a debt row
  const removeDebt = (index: number) => {
    setDebts((prev) => prev.filter((_, i) => i !== index));
  };

  // Trigger the calculation
  const handleCalculateSavings = () => {
    onCalculate(debts);
  };

  return (
    <>
      <Title>ENTER YOUR CURRENT DEBTS</Title>
      <DebtGrid>
        <DebtColumnLabel>DEBT NAME</DebtColumnLabel>
        <DebtColumnLabel>REMAINING DEBT AMOUNT</DebtColumnLabel>
        <DebtColumnLabel>CURRENT APR</DebtColumnLabel>
        <DebtColumnLabel>CURRENT MONTHLY PAYMENT</DebtColumnLabel>
        {/* Empty cell for the remove button */}
        <DebtColumnLabel></DebtColumnLabel>

        {debts.map((debt, index) => (
          <DebtRowItem
            key={debt.id}
            debt={debt}
            showRemove={debts.length > 1}
            onChange={(field, value) => handleDebtChange(index, field, value)}
            onRemove={() => removeDebt(index)}
          />
        ))}
      </DebtGrid>

      <ButtonSecondary type="button" onClick={addDebt}>
        + Add Another Debt
      </ButtonSecondary>

      <br />
      <br />

      <CalculateButton type="button" onClick={handleCalculateSavings}>
        Calculate Savings
      </CalculateButton>
    </>
  );
};

const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CalculateButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const DebtGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
`;

const DebtColumnLabel = styled.div`
  font-size: 0.7rem;
  color: #666;
`;

export default DebtInput;
