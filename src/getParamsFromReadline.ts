import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const getParamsFromReadline = async () => {
  const rl = readline.createInterface({ input, output });

  const year = await rl.question('Enter a year: ');
  const month = await rl.question('Enter a month: ');

  rl.close();

  const params = {
    year: Number(year),
    month: Number(month),
  };

  return params;
};
