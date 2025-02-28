import React, { useState } from "react";
import styled from "styled-components";

import { Debt } from "../types/debt";
import {
  calculateTotalRepayment,
  calculateNewTotalRepayment,
  calculateNewMonthlyPayment,
  calculateMonthlyPayment,
  roundTwoDecimalPlaces,
} from "../utils/debtCalcUtils";

interface DebtConsolidationCalcProps {
  debts: Debt[];
}

const DebtConsolidationCalc: React.FC<DebtConsolidationCalcProps> = ({
  debts,
}) => {
  // State for APR and Term
  const [desiredAPR, setDesiredAPR] = useState<number>(8);
  const [desiredTerm, setDesiredTerm] = useState<number>(24);

  // calculate payments and savings
  const totalRepayment = calculateTotalRepayment(debts);
  const newTotalRepayment = calculateNewTotalRepayment(
    debts,
    desiredAPR / 100, // convert to decimal
    desiredTerm
  );
  const totalRepaymentSavings = roundTwoDecimalPlaces(
    totalRepayment - newTotalRepayment
  );
  const newMonthlyPayment = calculateNewMonthlyPayment(
    debts,
    desiredAPR / 100, // convert to decimal
    desiredTerm
  );
  const currentMonthlyPayment = calculateMonthlyPayment(debts);
  const totalMonthlySavings = roundTwoDecimalPlaces(
    currentMonthlyPayment - newMonthlyPayment
  );

  return (
    <Container>
      <Header>
        <Title>CONFIGURE YOUR CONSOLIDATED LOAN</Title>
        <Subtitle>
          Use the sliders below to simulate the new APR and loan term.
        </Subtitle>
      </Header>

      <SlidersContainer>
        {/* APR Slider */}
        <SliderSection>
          <SliderLabel>DESIRED APR</SliderLabel>
          <SliderValue>{desiredAPR.toFixed(2)}%</SliderValue>
          <SliderInput
            min={4}
            max={36}
            step={0.1}
            value={desiredAPR}
            onChange={(e) => setDesiredAPR(parseFloat(e.target.value))}
          />
          <SliderRangeLabels>
            <span>4%</span>
            <span>36%</span>
          </SliderRangeLabels>
        </SliderSection>

        {/* Term Slider */}
        <SliderSection>
          <SliderLabel>DESIRED LOAN TERM</SliderLabel>
          <SliderValue>{desiredTerm} months</SliderValue>
          <SliderInput
            min={12}
            max={60}
            step={1}
            value={desiredTerm}
            onChange={(e) => setDesiredTerm(parseInt(e.target.value, 10))}
          />
          <SliderRangeLabels>
            <span>12 mo.</span>
            <span>60 mo.</span>
          </SliderRangeLabels>
        </SliderSection>
      </SlidersContainer>

      {/* Display Results */}
      <ResultsContainer>
        <ResultColumn>
          <ResultRow>
            <RowLabel>New Total Repayment</RowLabel>
            <RowValue>{newTotalRepayment}</RowValue>
          </ResultRow>
          <ResultRow>
            <RowLabel>Current Total Repayment</RowLabel>
            <RowValue>{totalRepayment}</RowValue>
          </ResultRow>
          <HighlightedRow>
            <RowLabel>Total Repayment Savings</RowLabel>
            <RowValue>{totalRepaymentSavings}</RowValue>
          </HighlightedRow>
        </ResultColumn>

        <ResultColumn>
          <ResultRow>
            <RowLabel>New Monthly Payment</RowLabel>
            <RowValue>{newMonthlyPayment}</RowValue>
          </ResultRow>
          <ResultRow>
            <RowLabel>Current Monthly Payment</RowLabel>
            <RowValue>{currentMonthlyPayment}</RowValue>
          </ResultRow>
          <HighlightedRow>
            <RowLabel>Total Monthly Savings</RowLabel>
            <RowValue>{totalMonthlySavings}</RowValue>
          </HighlightedRow>
        </ResultColumn>
      </ResultsContainer>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1.5rem;
  max-width: 700px;
  margin: 1rem 0 0 0;
  background: #fff;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.95rem;
`;

const SlidersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SliderLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 0.25rem;
`;

const SliderValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
`;

const SliderInput = styled.input.attrs({ type: "range" })`
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.25rem;
`;

const SliderRangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #777;
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #ccc;
  margin-top: 1rem;
  padding-top: 1rem;
  gap: 1rem;
`;

const ResultColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultRow = styled.div`
  display: flex;
  padding: 0 0.5rem;
  justify-content: space-between;
`;

const RowLabel = styled.span`
  color: #555;
`;

const RowValue = styled.span`
  font-weight: 600;
  color: #333;
`;

const HighlightedRow = styled(ResultRow)`
  background: #eafaf1;
  padding: 0.5rem;
  border-radius: 4px;

  ${RowValue} {
    color: #27ae60;
    font-weight: bold;
  }
`;

export default DebtConsolidationCalc;
