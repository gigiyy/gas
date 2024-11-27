export class Gasoline {
  constructor(
    public id: number,
    public buy_date: Date,
    public distance: number,
    public value: number,
  ) {}

  getFormattedDate(): string {
    return this.buy_date.toISOString().split('T')[0]
  }

  static fromDateString(dateStr: string): Date {
    return new Date(dateStr + 'T00:00:00.000Z')
  }

  toString(): string {
    return `Gasoline(id=${this.id}, date=${this.getFormattedDate()}, distance=${this.distance}, value=${this.value})`
  }
}
