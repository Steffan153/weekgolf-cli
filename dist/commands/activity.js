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
export const activityBuilder = (yargs) => {
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
export const activityHandler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = Object.assign(Object.assign(Object.assign({}, (argv.lang ? { lang: argv.lang } : {})), (argv.problem ? { problem: argv.problem } : {})), (argv.user ? { player: argv.user } : {}));
    const filterS = encodeURIComponent(JSON.stringify(filter));
    const colorLangs = yield getColorLangs();
    const x = yield fetchAPI(`/api/v1/activity?page=${argv.page}&filter=${filterS}`);
    x.forEach((x) => {
        const date = new Date(x.activity_date);
        const dateStr = chalk.gray((date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString()).padEnd(30));
        if (x.bytes) {
            return console.log(dateStr +
                x.title.padEnd(30) +
                chalk.cyanBright((x.problem || '').padEnd(26)) +
                (colorLangs[x.lang] ? chalk.hex(colorLangs[x.lang])(x.lang.padEnd(13)) : x.lang.padEnd(13)) +
                chalk.hex('#45fffc')(((x.old_bytes ? x.old_bytes + ' → ' : '') + x.bytes).padStart(14)) +
                ' bytes      ' +
                chalk.hex('#ff7891')((x.previous_user ? x.previous_user + ' → ' : '') +
                    x.username));
        }
        if (x.points) {
            return console.log(dateStr +
                x.title.padEnd(30) +
                chalk.cyanBright((x.problem || '').padEnd(26)) +
                (colorLangs[x.lang] ? chalk.hex(colorLangs[x.lang])(x.lang.padEnd(13)) : x.lang.padEnd(13)) +
                chalk.hex('#ff78ef')(('' + x.points).padStart(14)) +
                ' points     ' +
                chalk.hex('#ff7891')(x.username));
        }
        console.log(dateStr + x.title);
    });
});
