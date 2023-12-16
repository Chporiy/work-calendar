import { ModelConstructor } from './ModelCostructor';

describe('ModelConstructor', () => {
  it('should return a model', () => {
    const constructor = new ModelConstructor({ year: 2023, month: 10 });
    const model = constructor.construct();

    expect(model).toEqual([
      [0, 0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 0, 0, 0],
    ]);
  });

  it('should construct a model with fake days in the first week if the first day of month is not Monday', () => {
    const constructor = new ModelConstructor({ year: 2023, month: 11 });
    const model = constructor.construct();

    expect(model[0]).toEqual([0, 0, 0, 0, 1, 2, 3]);
  });

  it('should construct a model with fake days in the last week if the last day of month is not Sunday', () => {
    const constructor = new ModelConstructor({ year: 2024, month: 0 });
    const model = constructor.construct();

    expect(model[model.length - 1]).toEqual([29, 30, 31, 0, 0, 0, 0]);
  });

  it('should not construct a model with double days in the first week if the first day of month is Monday', () => {
    const constructor = new ModelConstructor({ year: 2024, month: 0 });
    const model = constructor.construct();
    const firstWeek = [1, 2, 3, 4, 5, 6, 7];

    expect(model[0]).not.toEqual([...firstWeek, firstWeek]);
  });

  it('should not construct a model with double days in the last week if the last day of month is Sunday', () => {
    const constructor = new ModelConstructor({ year: 2023, month: 11 });
    const model = constructor.construct();
    const lastWeek = [25, 26, 27, 28, 29, 30, 31];

    expect(model[model.length - 1]).not.toEqual([...lastWeek, ...lastWeek]);
  });
});
