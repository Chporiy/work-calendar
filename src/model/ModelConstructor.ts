import { MonthOverflowDaysFiller } from './MonthOverflowDaysFiller';
import { DayIndex, CalendarModel } from './types';

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
    model = MonthOverflowDaysFiller.fill(model);

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

  private static getDaysInMonth({ year, month }: Params) {
    return new Date(year, month + 1, 0).getDate();
  }

  private static isFirstDayInWeek(dayIndex: DayIndex) {
    return dayIndex === 0;
  }
}
