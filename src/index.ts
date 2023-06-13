#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { activityBuilder, activityHandler } from './commands/activity.js';
import { problemsBuilder, problemsHandler } from './commands/problems.js';
import { loginBuilder, loginHandler } from './commands/login.js';
import { problemBuilder, problemHandler } from './commands/problem.js';
import { solutionsBuilder, solutionsHandler } from './commands/solutions.js';
import { leaderboardBuilder, leaderboardHandler } from './commands/leaderboard.js';

yargs(hideBin(process.argv))
  .scriptName('wg')
  .usage('$0 <cmd> [args]')
  .command(
    'activity [page]',
    'Get the latest activity',
    activityBuilder,
    activityHandler
  )
  .command(
    'problems',
    'Get a list of problems',
    problemsBuilder,
    problemsHandler
  )
  .command(
    'problem <id>',
    'Get a problem by ID',
    problemBuilder,
    problemHandler
  )
  .command(
    'solutions <problem_id> <language>',
    'Get solutions for a problem in a language',
    solutionsBuilder,
    solutionsHandler
  )
  .command(
    'leaderboard <problem_id> <language>',
    'Get the leaderboard for a problem in a language',
    leaderboardBuilder,
    leaderboardHandler
  )
  .command('login', 'Login to your account', loginBuilder, loginHandler)
  .demandCommand()
  .strict()
  .alias('h', ['help'])
  .alias('v', ['version'])
  .help().argv;
