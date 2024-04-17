import {
  PriceInstallmentCalculator,
  SACInstallmentCalculator,
} from "../../../../src/gof/creational/abstract_factory/InstallmentCalculator";
import { MortgageLoan } from "../../../../src/gof/creational/abstract_factory/Loan";

// npx jest /test/gof/creational/abstract_factory/InstallmentCalculator.test.ts
test("Deve calcualr as parcelas utilizando SAC", () => {
  const installmentCalculator = new SACInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);
  expect(installments.at(0)?.number).toBe(1);
  expect(installments.at(0)?.amount).toBe(1250);
  expect(installments.at(0)?.amortization).toBe(416.67);
  expect(installments.at(0)?.interest).toBe(833.33);
  expect(installments.at(0)?.balance).toBe(99583.33);
  // console.log(installments.at(239));
  expect(installments.at(239)?.number).toBe(240);
  expect(installments.at(239)?.amount).toBe(420.14);
  expect(installments.at(239)?.amortization).toBe(416.67);
  expect(installments.at(239)?.interest).toBe(3.47);
  expect(installments.at(239)?.balance).toBe(0);
});

test.only("Deve calcualr as parcelas utilizando PRICE", () => {
  const installmentCalculator = new PriceInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);
  expect(installments.at(0)?.number).toBe(1);
  expect(installments.at(0)?.amount).toBe(965.02);
  expect(installments.at(0)?.amortization).toBe(131.69);
  expect(installments.at(0)?.interest).toBe(833.33);
  expect(installments.at(0)?.balance).toBe(99868.31);
  expect(installments.at(239)?.number).toBe(240);
  expect(installments.at(239)?.amount).toBe(965.02);
  expect(installments.at(239)?.amortization).toBe(957.03);
  expect(installments.at(239)?.interest).toBe(7.99);
  expect(installments.at(239)?.balance).toBe(0);
});
