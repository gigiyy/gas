export class Gasoline {
  constructor(
    public id: number,
    public buy_date: string,
    public distance: number,
    public value: number,
  ) {}

  toString(): string {
    return `Gasoline(id=${this.id}, date=${this.buy_date}, distance=${this.distance}, value=${this.value})`
  }
}
