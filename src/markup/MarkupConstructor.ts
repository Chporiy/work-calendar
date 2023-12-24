import { EOL } from 'node:os';
import { CalendarModel, Week } from '../model/types';
import { COLUMN_STYLES, ROW_STYLES } from './constants';

export class MarkupConstructor {
  private daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

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
      (header, day) => `${header}_${COLUMN_STYLES}. ${day} |`,
      '|',
    );
  }

  private getRows() {
    return this.model.reduce(
      (rows, week) => rows + MarkupConstructor.getRow(week) + MarkupConstructor.getEndOfLine(),
      '',
    );
  }

  private static getRow(week: Week) {
    return week.reduce(
      (row, day) => row + MarkupConstructor.getDay(day),
      MarkupConstructor.getRowMetaData(),
    );
  }

  private static getRowMetaData() {
    return `${ROW_STYLES}. |`;
  }

  private static getDay(day: number) {
    return day === 0 ? '|' : `^. ${day}|`;
  }

  private static getEndOfLine() {
    return EOL;
  }
}
