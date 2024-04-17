import Loan from "./Loan";

export default interface LoanRepository {
  save(loan: Loan): Promise<void>;
  getById(loanId: string): Promise<Loan>;
}

export class LoanRepositoryMemory implements LoanRepository {
  loans: Loan[];
  constructor() {
    this.loans = [];
  }
  async save(loan: Loan): Promise<void> {
    this.loans.push(loan);
  }
  async getById(loanId: string): Promise<Loan> {
    const loan = this.loans.find((loan: Loan) => loan.loanId === loanId);
    if (!loan) throw new Error("Loan not found");
    return loan;
  }
}
