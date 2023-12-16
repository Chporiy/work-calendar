import { CalendarModel, Week } from '../model/types';

export class MarkupConstructor {
  private daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  private columnStyles = '{width: 90px;}';

  private rowStyles = '{height: 70px; text-align: right;}';

  private model: CalendarModel;

  constructor(model: CalendarModel) {
    this.model = model;
  }

  construct() {
    const header = this.getColumns();
    const rows = this.getRows();

    return header + MarkupConstructor.getEndOfLine() + rows;
  }

  private getColumns() {
    return this.daysOfWeek.reduce(
      (header, day) => `${header}_${this.columnStyles}. ${day} |`,
      '|',
    );
  }

  private getRows() {
    return this.model.reduce(
      (rows, week) => rows + this.getRow(week) + MarkupConstructor.getEndOfLine(),
      '',
    );
  }

  private getRow(week: Week) {
    return week.reduce(
      (row, day) => row + MarkupConstructor.getDay(day),
      this.getRowMetaData(),
    );
  }

  private getRowMetaData() {
    return `${this.rowStyles}. |`;
  }

  private static getDay(day: number) {
    return day === 0 ? '|' : `^. ${day}|`;
  }

  private static getEndOfLine() {
    return '\r\n';
  }
}
