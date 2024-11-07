export class CPF {
  private readonly _value: string;

  private constructor(value: string) {
    this.validateCPF(value);
    this._value = value;
    Object.freeze(this);
  }

  get value(): string {
    return this._value;
  }

  public static create(cpf: string): CPF {
    return new CPF(cpf);
  }

  private validateCPF(value: string): void {
    const cpf = value?.trim() ?? '';
    const cleanedCPF = cpf.replace(/[^\d]/g, '');

    if (
      cleanedCPF.length !== 11 ||
      this.isAllDigitsEqual(cleanedCPF) ||
      !this.isValidCPF(cleanedCPF)
    ) {
      throw new Error('Invalid CPF');
    }
  }

  private isAllDigitsEqual(cpf: string): boolean {
    return /^(\d)\1*$/.test(cpf);
  }

  private isValidCPF(cpf: string): boolean {
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    return remainder === parseInt(cpf.substring(10, 11));
  }
}
