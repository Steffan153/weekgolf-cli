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
import prompts from 'prompts';
import { fetchAPI } from '../utils/auth.js';
export const loginBuilder = () => { };
export const loginHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = yield prompts([
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
    const { token } = yield fetchAPI("/api/v1/login", {
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
});
