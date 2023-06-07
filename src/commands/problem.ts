import chalk from 'chalk';
import type { BuilderCallback, ArgumentsCamelCase } from 'yargs';
import getColorLangs from '../utils/color-langs.js';
import boxen from 'boxen';
import { fetchAPI } from '../utils/auth.js';

export const problemBuilder: BuilderCallback<{}, {}> = (yargs) => {
  yargs.positional('id', {
    demandOption: 'Please provide an ID.',
    type: 'number',
  });
};

const paragraph = (s: string) => {
  return s.replace(/<[\w\/][^>]*>/g, '').replace(/\n/g, '\n\n');
};

export const problemHandler = async (argv: ArgumentsCamelCase<{}>) => {
  const colorLangs = await getColorLangs();

  let {
    date_end,
    descript,
    expected_output,
    input,
    lotw,
    sum_votes,
    title,
    voters,
  } = await fetchAPI(`/api/v1/problem?id=` + argv.id);
  const rating = voters
    ? Math.round((sum_votes / voters) * 100) / 10 + '%'
    : 'Not rated';
  console.log(
    boxen(chalk.hex('#35e880')(title), {
      padding: 1,
      margin: 1,
      borderColor: '#35e880',
    })
  );
  console.log(
    boxen(
      paragraph(descript.split('<br><b><u>Example:</u></b><br>')[0]).trim(),
      {
        padding: 1,
        title: 'Description',
        titleAlignment: 'center',
        borderColor: '#57c2ff',
      }
    )
  );
  console.log(
    boxen(input, {
      padding: 1,
      title: 'Example input',
      titleAlignment: 'center',
      borderColor: '#e88aff',
    })
  );
  console.log(
    boxen(expected_output, {
      padding: 1,
      title: 'Example output',
      titleAlignment: 'center',
      borderColor: '#e88aff',
    })
  );
  const example = descript
    .split('<br><b><u>Example:</u></b><br>')[1]
    ?.split('More info</div>')[0];
  if (example) {
    console.log(
      boxen(paragraph(example).trim(), {
        padding: 1,
        title: 'Example',
        titleAlignment: 'center',
        borderColor: '#ff6bbf',
      })
    );
  }
  console.log(
    boxen(paragraph(descript.split('More info</div>')[1]).trim(), {
      padding: 1,
      title: 'More info',
      titleAlignment: 'center',
      borderColor: '#956bff',
    })
  );
  console.log(
    boxen(rating, {
      padding: 1,
      title: 'Rating',
      titleAlignment: 'center',
      borderColor: '#ffab6b',
    })
  );
  let time = +new Date() - +new Date(date_end);
  let timeLeft = '';
  if (time <= 0) {
    timeLeft = 'Finished!';
  } else {
    if (time >= 86400000) {
      timeLeft += ((time / 86400000) | 0) + ' days ';
      time %= 86400000;
    }
    if (time >= 3600000) {
      timeLeft += ((time / 3600000) | 0) + ' hours ';
      time %= 3600000;
    }
    if (time >= 60000) {
      timeLeft += ((time / 60000) | 0) + ' minutes ';
      time %= 60000;
    }
    if (time >= 1000) {
      timeLeft += ((time / 1000) | 0) + ' seconds ';
    }
  }
  console.log(
    boxen(timeLeft, {
      padding: 1,
      title: 'Time left',
      titleAlignment: 'center',
      borderColor: '#ff6b6b',
    })
  );
  if (lotw) {
    const color = colorLangs[lotw.toLowerCase()];
    console.log(
      boxen(color ? chalk.hex(color)(lotw.padEnd(20)) : lotw.padEnd(20), {
        padding: 1,
        title: 'LOTW',
        titleAlignment: 'center',
        borderColor: '#03fcd7'
      })
    );
  }
};
