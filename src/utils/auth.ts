import { Netrc } from 'netrc-parser';
import chalk from 'chalk';

const netrc = new Netrc();

export function getAuth(): string | null {
  netrc.loadSync();
  const wg = netrc.machines['api.weekgolf.net'];
  if (!wg || !wg.token) {
    console.log("Please login first using " + chalk.hex('#3495eb')("wg login") + " first.");
    return null;
  }
  return wg.token;
}