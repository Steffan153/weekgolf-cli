import { Netrc } from 'netrc-parser';
import chalk from 'chalk';

const netrc = new Netrc();

export function getAuth(): string | null {
  netrc.loadSync();
  const wg = netrc.machines['api.weekgolf.net'];
  if (!wg || !wg.token) {
    console.log("Please login using " + chalk.hex('#3495eb')("wg login") + " first.");
    return null;
  }
  return wg.token;
}

export async function fetchAPI(url: string, opts?: any): Promise<any> {
  const base = process.env.WEEKGOLF_BASE || `https://api.weekgolf.net`;

  try {
    const res = await fetch(base + url, opts);

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(text);
      process.exit(0);
    }
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
}