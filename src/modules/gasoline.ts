export class Gasoline {
  constructor(
    public id: number,
    public buy_date: Date,
    public amount: number,
    public value: number,
  ) {}

  toString(): string {
    return `Gasoline(id=${this.id}, date=${this.buy_date}, amount=${this.amount}, value=${this.value})`
  }
}
