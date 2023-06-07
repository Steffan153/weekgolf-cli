import { Netrc } from 'netrc-parser';
import prompts from 'prompts';
import { fetchAPI } from '../utils/auth.js';

export const loginBuilder = () => {};

export const loginHandler = async () => {
  const { username, password } = await prompts([
    {
      type: 'text',
      name: 'username',
      message: 'Username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:'
    }
  ]);

  const { token } = await fetchAPI("/api/v1/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pwd: password,
      name: username,
    })
  });
  
  const netrc = new Netrc();
  netrc.loadSync();
  netrc.machines['api.weekgolf.net'] = { token };
  netrc.saveSync();
  console.log('Successfully logged in!');
};