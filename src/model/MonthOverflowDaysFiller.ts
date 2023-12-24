import { CalendarModel, Week } from './types';

export class MonthOverflowDaysFiller {
  static fill(model: CalendarModel) {
    let newModel = this.fillFirstWeek(model);
    newModel = this.fillLastWeek(newModel);

    return newModel;
  }

  private static fillFirstWeek(model: CalendarModel) {
    if (this.isFullWeek(model[0])) {
      return model;
    }

    const copy = [...model];
    const overflowDays = this.createOverflowDays(copy[0]);

    copy[0] = [...overflowDays, ...copy[0]];

    return copy;
  }

  private static fillLastWeek(model: CalendarModel) {
    if (this.isFullWeek(model[model.length - 1])) {
      return model;
    }

    const copy = [...model];
    const lastWeekIndex = copy.length - 1;
    const overflowDays = this.createOverflowDays(copy[lastWeekIndex]);

    copy[lastWeekIndex] = [...copy[lastWeekIndex], ...overflowDays];

    return copy;
  }

  private static createOverflowDays(week: Week) {
    const diff = 7 - week.length;

    if (diff === 0) return week;

    return new Array(diff).fill(0) as number[];
  }

  private static isFullWeek(week: Week) {
    return week.length === 7;
  }
}
