import Installment from "./Installment";

export default interface InstallmentRepository {
  save(installment: Installment): Promise<void>;
  listByLoanId(installmentId: string): Promise<Installment[]>;
}

export class InstallmentRepositoryMemory implements InstallmentRepository {
  installments: Installment[];
  constructor() {
    this.installments = [];
  }
  async save(installment: Installment): Promise<void> {
    this.installments.push(installment);
  }
  async listByLoanId(loanId: string): Promise<Installment[]> {
    const installments = this.installments.filter(
      (installment: Installment) => installment.loanId === loanId
    );
    return installments;
  }
}
