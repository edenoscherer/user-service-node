import { v4 as uuidv4 } from 'uuid';

export class UUID {
  private readonly _value: string;

  constructor(value: string) {
    this.validateUUID(value);
    this._value = value;
    Object.freeze(this);
  }

  get value(): string {
    return this._value;
  }

  private validateUUID(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('Invalid UUID format');
    }
  }

  static create(): UUID {
    return new UUID(uuidv4());
  }

  equals(other: UUID): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
