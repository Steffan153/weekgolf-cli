import chalk from 'chalk';
import type { BuilderCallback, ArgumentsCamelCase } from 'yargs';
import boxen from 'boxen';
import { fetchAPI } from '../utils/auth.js';

export const solutionsBuilder: BuilderCallback<{}, {}> = (yargs) => {
  yargs.positional('problem_id', {
    demandOption: 'Please provide a problem ID.',
    type: 'number',
  });
  yargs.positional('language', {
    demandOption: 'Please provide a language.',
    type: 'string',
  });
};

export const solutionsHandler = async (argv: ArgumentsCamelCase<{}>) => {
  const res = await fetchAPI(
    `/api/v1/solutions?id=${argv.problem_id}&lang=${argv.language}`
  );
  console.log(
    boxen(
    `Solutions for problem ${chalk.red(argv.problem_id)} in language ${chalk.blue(argv.language)}:`, {
      padding: 0.5
    })
  );
  if (!res.length) {
    console.log(chalk.red('\n\nNo solutions found!'));
  } else {
    let upgradeNum = 0;
    let solNum = 0;
    res.forEach((x: any) => {
      console.log(
        boxen(
          chalk.hex('#1eff00')(
            x.upgrade ? `UPGRADE ${++upgradeNum}` : `SOLUTION ${++solNum}`
          ) + chalk.hex('#0066ff')(`   BY ${x.name}`) + chalk.hex('#ff5e00')(`   ${x.size} bytes`),
          {
            padding: 0.5,
            borderColor: '#1eff00',
            margin: {
              top: 2
            }
          }
        )
      );
      console.log(boxen(x.code, {
        margin: {
          left: 2,
          top: 0.5
        },
        padding: 0.5,
        borderColor: '#0066ff'
      }))
    });
  }
};
