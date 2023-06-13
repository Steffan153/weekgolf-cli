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
import getColorLangs from '../utils/color-langs.js';
import { fetchAPI } from '../utils/auth.js';
export const problemsBuilder = (yargs) => {
    yargs.option('sort_rating', {
        alias: 'r',
        describe: 'Sort by rating instead of ID',
    });
};
export const problemsHandler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    const colorLangs = yield getColorLangs();
    const x = yield fetchAPI('/api/v1/problems');
    x.forEach((x) => {
        x.rating = x.voters ? x.sum_votes / x.voters * 100 : 0;
    });
    if (argv.sort_rating) {
        x.sort((a, b) => a.rating - b.rating);
    }
    x.forEach((x) => {
        x.lotw = x.lotw || '';
        console.log(x.id.toString().padEnd(10) +
            chalk.blueBright(x.title.padEnd(30)) +
            (colorLangs[x.lotw.toLowerCase()]
                ? chalk.hex(colorLangs[x.lotw.toLowerCase()])(x.lotw.padEnd(20))
                : x.lotw.padEnd(20)) +
            chalk.yellow(x.rating === 0 ? '' : Math.round(x.rating) / 10 + '%'));
    });
});
