import { MarkupParser } from './MarkupParser';

describe('MarkupParser', () => {
  test('should parse the markup to the model', () => {
    const markup = `|_{width: 90px;}. Пн |_{width: 90px;}. Вт |_{width: 90px;}. Ср |_{width: 90px;}. Чт |_{width: 90px;}. Пт |_{width: 90px;}. Сб |_{width: 90px;}. Вс |
      {height: 70px; text-align: right;}. |||^. 1|^. 2|^. 3|^. 4|^. 5|
      {height: 70px; text-align: right;}. |^. 6|^. 7|^. 8|^. 9|^. 10|^. 11|^. 12|
      {height: 70px; text-align: right;}. |^. 13|^. 14|^. 15|^. 16|^. 17|^. 18|^. 19|
      {height: 70px; text-align: right;}. |^. 20|^. 21|^. 22|^. 23|^. 24|^. 25|^. 26|
      {height: 70px; text-align: right;}. |^. 27|^. 28|^. 29|^. 30|^. 31|||`;

    const model = MarkupParser.toModel(markup);

    expect(model).toEqual([
      [0, 0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 31, 0, 0],
    ]);
  });

  test('should parse the markup to the model with the overflow days in the first week if the first day of month is not Monday', () => {
    const markup = `|_{width: 90px;}. Пн |_{width: 90px;}. Вт |_{width: 90px;}. Ср |_{width: 90px;}. Чт |_{width: 90px;}. Пт |_{width: 90px;}. Сб |_{width: 90px;}. Вс |
    {height: 70px; text-align: right;}. |||||^. 1|^. 2|^. 3|
    {height: 70px; text-align: right;}. |^. 4|^. 5|^. 6|^. 7|^. 8|^. 9|^. 10|
    {height: 70px; text-align: right;}. |^. 11|^. 12|^. 13|^. 14|^. 15|^. 16|^. 17|
    {height: 70px; text-align: right;}. |^. 18|^. 19|^. 20|^. 21|^. 22|^. 23|^. 24|
    {height: 70px; text-align: right;}. |^. 25|^. 26|^. 27|^. 28|^. 29|^. 30|^. 31|`;

    const model = MarkupParser.toModel(markup);

    expect(model[0]).toEqual([0, 0, 0, 0, 1, 2, 3]);
  });

  test('should parse the markup to the model with the overflow days in the last week if the last day of month is not Sunday', () => {
    const markup = `|_{width: 90px;}. Пн |_{width: 90px;}. Вт |_{width: 90px;}. Ср |_{width: 90px;}. Чт |_{width: 90px;}. Пт |_{width: 90px;}. Сб |_{width: 90px;}. Вс |
    {height: 70px; text-align: right;}. |^. 1|^. 2|^. 3|^. 4|^. 5|^. 6|^. 7|
    {height: 70px; text-align: right;}. |^. 8|^. 9|^. 10|^. 11|^. 12|^. 13|^. 14|
    {height: 70px; text-align: right;}. |^. 15|^. 16|^. 17|^. 18|^. 19|^. 20|^. 21|
    {height: 70px; text-align: right;}. |^. 22|^. 23|^. 24|^. 25|^. 26|^. 27|^. 28|
    {height: 70px; text-align: right;}. |^. 29|^. 30|^. 31|||||`;

    const model = MarkupParser.toModel(markup);

    expect(model[model.length - 1]).toEqual([29, 30, 31, 0, 0, 0, 0]);
  });
});
