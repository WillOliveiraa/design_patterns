import InstallmentRepository from "./InstallmentRepository";
import LoanRepository from "./LoanRepository";

export default class GetLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanRepository.getById(input.loanId);
    const installments = await this.installmentRepository.listByLoanId(
      input.loanId
    );
    const output: Output = {
      amount: loan.amount,
      income: loan.income,
      installments: [],
    };
    for (const installment of installments) {
      output.installments.push({
        number: installment.number,
        amount: installment.amount,
        amortization: installment.amortization,
        interest: installment.interest,
        balance: installment.balance,
      });
    }
    return output;
  }
}

type Input = {
  loanId: string;
};

type Output = {
  amount: number;
  income: number;
  installments: {
    number: number;
    amount: number;
    amortization: number;
    interest: number;
    balance: number;
  }[];
};
