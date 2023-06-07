import chalk from 'chalk';
import type { BuilderCallback, ArgumentsCamelCase } from 'yargs';
import getColorLangs from '../utils/color-langs.js';
import { fetchAPI } from '../utils/auth.js';

export const activityBuilder: BuilderCallback<{}, {}> = (yargs) => {
  yargs
    .positional('page', {
      type: 'number',
      default: 1,
      describe: 'Page number',
    })
    .option('user', {
      alias: 'u',
      type: 'string',
      describe: 'Filter by user',
    })
    .option('problem', {
      alias: 'p',
      type: 'string',
      describe: 'Filter by problem',
    })
    .option('lang', {
      alias: 'l',
      type: 'string',
      describe: 'Filter by language',
    });
};

export const activityHandler = async (argv: ArgumentsCamelCase<{}>) => {
  const filter = {
    ...(argv.lang ? { lang: argv.lang } : {}),
    ...(argv.problem ? { problem: argv.problem } : {}),
    ...(argv.user ? { player: argv.user } : {}),
  };

  const filterS = encodeURIComponent(JSON.stringify(filter));

  const colorLangs = await getColorLangs();

  const x = await fetchAPI(`/api/v1/activity?page=${argv.page}&filter=${filterS}`);
  x.forEach((x: any) => {
    const date = new Date(x.activity_date);
    const dateStr = chalk.gray((
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString()
    ).padEnd(30));
    if (x.bytes) {
      return console.log(
        dateStr +
          x.title.padEnd(30) +
          chalk.cyanBright ((x.problem || '').padEnd(26)) +
          (colorLangs[x.lang] ? chalk.hex(colorLangs[x.lang])(x.lang.padEnd(13)) : x.lang.padEnd(13)) +
          chalk.hex('#45fffc')(((x.old_bytes ? x.old_bytes + ' → ' : '') + x.bytes).padStart(
            14
          )) +
          ' bytes      '+
          chalk.hex('#ff7891')((x.previous_user ? x.previous_user + ' → ' : '') +
          x.username)
      );
    }
    if (x.points) {
      return console.log(
        dateStr +
          x.title.padEnd(30) +
          chalk.cyanBright((x.problem || '').padEnd(26)) +
          (colorLangs[x.lang] ? chalk.hex(colorLangs[x.lang])(x.lang.padEnd(13)) : x.lang.padEnd(13)) +
          chalk.hex('#ff78ef')(('' + x.points).padStart(
            14
          )) +
          ' points     '+
          chalk.hex('#ff7891')(x.username)
      );
    }
    console.log(dateStr + x.title);
  });
};