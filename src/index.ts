import { exit } from 'process';
import { getParamsFromReadline } from './getParamsFromReadline';
import { MarkupConstructor } from './markup';
import { ModelConstructor } from './model';

(async () => {
  const params = await getParamsFromReadline();
  const modelConstructor = new ModelConstructor(params);
  const model = modelConstructor.construct();

  const markupConstructor = new MarkupConstructor(model);
  const markup = markupConstructor.construct();

  // eslint-disable-next-line no-console
  console.log(markup);

  exit();
})();
