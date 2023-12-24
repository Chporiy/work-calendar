import { EOL } from 'node:os';
import { CalendarModel, Week, MonthOverflowDaysFiller } from '../model';

export class MarkupParser {
  static toModel(markup: string): CalendarModel {
    const rows = MarkupParser.getMarkupRows(markup);
    let model = MarkupParser.getModelByRows(rows);

    model = MonthOverflowDaysFiller.fill(model);

    return model;
  }

  private static getMarkupRows(markup: string) {
    const [, ...rows] = markup.split(EOL);

    return rows;
  }

  private static getModelByRows(rows: string[]): Week[] {
    return rows.map((row) => MarkupParser.getWeekByRow(row));
  }

  private static getWeekByRow(row: string): Week {
    const rowWithoutStyles = row.slice(row.indexOf('|'));
    const days = rowWithoutStyles.match(/\d+/g);
    const week = days!.map((day) => Number(day));

    return week;
  }
}
