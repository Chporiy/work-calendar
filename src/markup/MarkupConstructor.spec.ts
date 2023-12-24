import { EOL } from 'os';
import { MarkupConstructor } from './MarkupConstructor';
import { ModelConstructor } from '../model/ModelCostructor';

describe('MarkupConstructor', () => {
  it('should return calendar markup by calendar model', () => {
    const modelConstructor = new ModelConstructor({ year: 2023, month: 11 });
    const model = modelConstructor.construct();

    const markupConstructor = new MarkupConstructor(model);
    const markup = markupConstructor.construct();

    const expectedRows = `|_{width: 90px;}. Пн |_{width: 90px;}. Вт |_{width: 90px;}. Ср |_{width: 90px;}. Чт |_{width: 90px;}. Пт |_{width: 90px;}. Сб |_{width: 90px;}. Вс |${EOL}`
      + `{height: 70px; text-align: right;}. |||||^. 1|^. 2|^. 3|${EOL}`
      + `{height: 70px; text-align: right;}. |^. 4|^. 5|^. 6|^. 7|^. 8|^. 9|^. 10|${EOL}`
      + `{height: 70px; text-align: right;}. |^. 11|^. 12|^. 13|^. 14|^. 15|^. 16|^. 17|${EOL}`
      + `{height: 70px; text-align: right;}. |^. 18|^. 19|^. 20|^. 21|^. 22|^. 23|^. 24|${EOL}`
      + `{height: 70px; text-align: right;}. |^. 25|^. 26|^. 27|^. 28|^. 29|^. 30|^. 31|${EOL}`;

    expect(markup).toBe(expectedRows);
  });
});
