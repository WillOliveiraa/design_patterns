import { SACInstallmentCalculator } from "./InstallmentCalculator";
import InstallmentRepository from "./InstallmentRepository";
import { MortgageLoan } from "./Loan";
import LoanRepository from "./LoanRepository";

export default class ApplyForLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (input.type === "mortgage") {
      const loan = MortgageLoan.create(
        input.amount,
        input.income,
        input.installments
      );
      const installmentCalculator = new SACInstallmentCalculator();
      const installments = installmentCalculator.calculate(loan);
      await this.loanRepository.save(loan);
      for (const installment of installments) {
        await this.installmentRepository.save(installment);
      }
      return { loanId: loan.loanId };
    }
    throw new Error("Loan type not available");
  }
}

type Input = {
  amount: number;
  income: number;
  installments: number;
  type: string;
};

type Output = {
  loanId: string;
};
