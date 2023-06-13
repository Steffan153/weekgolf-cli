var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import { fetchAPI } from '../utils/auth.js';
export const leaderboardBuilder = (yargs) => {
    yargs.positional('problem_id', {
        demandOption: 'Please provide a problem ID.',
        type: 'number',
    });
    yargs.positional('language', {
        demandOption: 'Please provide a language.',
        type: 'string',
    });
};
export const leaderboardHandler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetchAPI(`/api/v1/leaderboard-problem?problemId=${argv.problem_id}&lang=${argv.language}`);
    let idx = 0, realIdx = 0, prevBytes = null;
    res.sort((a, b) => a.bytes - b.bytes).forEach(x => {
        realIdx++;
        if (prevBytes !== x.bytes) {
            idx = realIdx;
        }
        prevBytes = x.bytes;
        console.log(`${idx}.`.padEnd(7) + chalk.hex('#0066ff')(x.name.padEnd(25)) + chalk.hex('#ff5e00')(`${x.bytes} bytes`));
    });
});
