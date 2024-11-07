export class Email {
  private readonly _value: string;

  private constructor(value: string) {
    this.isValidEmail(value);
    this._value = value;
    Object.freeze(this);
  }

  get value(): string {
    return this._value;
  }

  public static create(email: string): Email {
    return new Email(email);
  }

  private isValidEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
  }

  public equals(other: Email): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
