import chalk from 'chalk';
import type { BuilderCallback, ArgumentsCamelCase } from 'yargs';
import getColorLangs from '../utils/color-langs.js';

export const problemsBuilder: BuilderCallback<{}, {}> = (yargs) => {
  yargs.option('sort-rating', {
    alias: 'r',
    describe: 'Sort by rating instead of ID',
  });
};

export const problemsHandler = async (argv: ArgumentsCamelCase<{}>) => {
  const colorLangs = await getColorLangs();

  const x = await (
    await fetch(`https://api.weekgolf.net/api/v1/problems`)
  ).json();
  x.forEach((x: any) => {
    x.rating = x.voters ? x.sum_votes / x.voters * 100 : 0;
  });
  if (argv['sort-rating']) {
    x.sort((a: any, b: any) => a.rating - b.rating);
  }
  x.forEach((x: any) => {
    x.lotw = x.lotw || '';
    console.log(
      x.id.toString().padEnd(10) +
        chalk.blueBright(x.title.padEnd(30)) +
        (colorLangs[x.lotw.toLowerCase()]
          ? chalk.hex(colorLangs[x.lotw.toLowerCase()])(x.lotw.padEnd(20))
          : x.lotw.padEnd(20)) +
        chalk.yellow(
          x.rating === 0 ? '' : Math.round(x.rating) / 10 + '%'
        )
    );
  });
};
