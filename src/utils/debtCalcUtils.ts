import { Debt } from "../types/debt";
import { nper, pmt } from "financial";

export const roundTwoDecimalPlaces = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const calculateTotalRepayment = (debts: Debt[]): number => {
  const total = debts.reduce((total, debt) => {
    const numberOfPayments = nper(
      parseFloat(debt.apr) / 12 / 100,
      -parseFloat(debt.monthlyPayment),
      parseFloat(debt.amount)
    );
    return total + parseFloat(debt.monthlyPayment) * numberOfPayments;
  }, 0);

  return roundTwoDecimalPlaces(total);
};

export const calculateNewTotalRepayment = (
  debts: Debt[],
  desiredAPR: number,
  desiredTerm: number
): number => {
  return roundTwoDecimalPlaces(
    calculateNewMonthlyPayment(debts, desiredAPR, desiredTerm) * desiredTerm
  );
};

export const calculateNewMonthlyPayment = (
  debts: Debt[],
  desiredAPR: number,
  desiredTerm: number
): number => {
  const princial = debts.reduce(
    (total, debt) => total + parseFloat(debt.amount),
    0
  );
  const monthlyPayment = pmt(desiredAPR / 12, desiredTerm, princial);

  return roundTwoDecimalPlaces(-monthlyPayment);
};

export const calculateMonthlyPayment = (debts: Debt[]): number => {
  const total = debts.reduce((total, debt) => {
    return total + parseFloat(debt.monthlyPayment);
  }, 0);

  return roundTwoDecimalPlaces(total);
};
