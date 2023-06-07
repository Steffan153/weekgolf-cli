var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Netrc } from 'netrc-parser';
import chalk from 'chalk';
const netrc = new Netrc();
export function getAuth() {
    netrc.loadSync();
    const wg = netrc.machines['api.weekgolf.net'];
    if (!wg || !wg.token) {
        console.log("Please login using " + chalk.hex('#3495eb')("wg login") + " first.");
        return null;
    }
    return wg.token;
}
export function fetchAPI(url, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = process.env.WEEKGOLF_BASE || `https://api.weekgolf.net`;
        try {
            const res = yield fetch(base + url, opts);
            const text = yield res.text();
            try {
                return JSON.parse(text);
            }
            catch (e) {
                console.error(text);
                process.exit(0);
            }
        }
        catch (e) {
            console.error(e);
            process.exit(0);
        }
    });
}
