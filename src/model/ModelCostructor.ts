import { DayIndex, Week, CalendarModel } from './types';

interface Params {
  year: number;
  month: number;
}

export class ModelConstructor {
  private readonly dayOfWeekIndex: { [k: number]: DayIndex } = {
    1: 0, // Monday
    2: 1, // Tuesday
    3: 2, // Wednesday
    4: 3, // Thursday
    5: 4, // Friday
    6: 5, // Saturday
    0: 6, // Sunday
  };

  private params: Params;

  constructor(params: Params) {
    this.params = params;
  }

  construct() {
    let model = this.createModel();
    model = ModelConstructor.fillFirstWeek(model);
    model = ModelConstructor.fillLastWeek(model);

    return model;
  }

  private createModel(): CalendarModel {
    let dayOfWeek = this.getDayOfWeek({ ...this.params, date: 1 });
    const daysInMonth = ModelConstructor.getDaysInMonth(this.params);

    return [...new Array(daysInMonth)].reduce((model, _, index) => {
      const day = index + 1;

      if (ModelConstructor.isFirstDayInWeek(dayOfWeek) || day === 1) {
        model.push([]);
      }

      (model[model.length - 1]).push(day);
      dayOfWeek = this.getDayOfWeek({ ...this.params, date: day + 1 }) % 7;

      return model;
    }, []);
  }

  private getDayOfWeek({ year, month, date }: Params & { date: number }) {
    const dayIndex = new Date(year, month, date).getDay() as DayIndex;

    return this.dayOfWeekIndex[dayIndex];
  }

  private static fillFirstWeek(model: CalendarModel) {
    if (this.isFullWeek(model[0])) {
      return model;
    }

    const copy = [...model];
    const arrayWithFakeDays = this.createFakeDaysInWeekArray(copy[0]);

    copy[0] = [...arrayWithFakeDays, ...copy[0]];

    return copy;
  }

  private static fillLastWeek(model: CalendarModel) {
    if (this.isFullWeek(model[model.length - 1])) {
      return model;
    }

    const copy = [...model];
    const lastWeekIndex = copy.length - 1;
    const arrayWithFakeDays = this.createFakeDaysInWeekArray(copy[lastWeekIndex]);

    copy[lastWeekIndex] = [...copy[lastWeekIndex], ...arrayWithFakeDays];

    return copy;
  }

  private static createFakeDaysInWeekArray(week: Week) {
    const diff = 7 - week.length;

    if (diff === 0) return week;

    return new Array(diff).fill(0) as number[];
  }

  private static getDaysInMonth({ year, month }: Params) {
    return new Date(year, month + 1, 0).getDate();
  }

  private static isFirstDayInWeek(dayIndex: DayIndex) {
    return dayIndex === 0;
  }

  private static isFullWeek(week: Week) {
    return week.length === 7;
  }
}
