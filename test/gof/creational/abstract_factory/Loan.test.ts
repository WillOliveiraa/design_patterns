import { MortgageLoan } from "../../../../src/gof/creational/abstract_factory/Loan";

// npx jest test/gof/creational/abstract_factory/Loan.test.ts
test("Deve criar um financiamento imobiliário", () => {
  const loan = new MortgageLoan("abc123", 100000, 10000, 240);
  expect(loan.loanId).toBeDefined();
  expect(loan.amount).toBe(100000);
  expect(loan.income).toBe(10000);
  expect(loan.installments).toBe(240);
});
