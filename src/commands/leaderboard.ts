import chalk from 'chalk';
import type { BuilderCallback, ArgumentsCamelCase } from 'yargs';
import { fetchAPI } from '../utils/auth.js';

export const leaderboardBuilder: BuilderCallback<{}, {}> = (yargs) => {
  yargs.positional('problem_id', {
    demandOption: 'Please provide a problem ID.',
    type: 'number',
  });
  yargs.positional('language', {
    demandOption: 'Please provide a language.',
    type: 'string',
  });
};

export const leaderboardHandler = async (argv: ArgumentsCamelCase<{}>) => {
  const res: {
    owner_id: number;
    bytes: number;
    pfp: string;
    name: string;
    date: number;
  }[] = await fetchAPI(`/api/v1/leaderboard-problem?problemId=${argv.problem_id}&lang=${argv.language}`);
  let idx = 0, realIdx = 0, prevBytes: any = null;
  res.sort((a, b) => a.bytes - b.bytes).forEach(x => {
    realIdx++;
    if (prevBytes !== x.bytes) {
      idx = realIdx;
    }
    prevBytes = x.bytes;
    console.log(`${idx}.`.padEnd(7) + chalk.hex('#0066ff')(x.name.padEnd(25)) + chalk.hex('#ff5e00')(`${x.bytes} bytes`));
  });
};
