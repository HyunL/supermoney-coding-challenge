import styled from "styled-components";
import { FC, ChangeEvent } from "react";

import { Debt } from "../types/debt";

interface DebtRowItemProps {
  debt: Debt;
  showRemove: boolean;
  onChange: (field: keyof Omit<Debt, "id">, value: string) => void;
  onRemove: () => void;
}

const DebtRowItem: FC<DebtRowItemProps> = ({
  debt,
  showRemove,
  onChange,
  onRemove,
}) => {
  const { name, amount, apr, monthlyPayment } = debt;

  // Event handler for input changes
  const handleInputChange =
    (field: keyof Omit<Debt, "id">) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <>
      <DebtInputField
        type="text"
        placeholder="e.g. Credit Card"
        value={name}
        onChange={handleInputChange("name")}
      />
      <DebtInputField
        type="number"
        placeholder="5000"
        value={amount}
        onChange={handleInputChange("amount")}
      />
      <DebtInputField
        type="number"
        step="0.01"
        placeholder="15.99"
        value={apr}
        onChange={handleInputChange("apr")}
      />
      <DebtInputField
        type="number"
        placeholder="200"
        value={monthlyPayment}
        onChange={handleInputChange("monthlyPayment")}
      />
      {showRemove && (
        <RemoveIconButton
          type="button"
          onClick={onRemove}
          title="Remove this debt"
        >
          &times;
        </RemoveIconButton>
      )}
    </>
  );
};

const DebtInputField = styled.input`
  min-width: 50px;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const RemoveIconButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

export default DebtRowItem;
