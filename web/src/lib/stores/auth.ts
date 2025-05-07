import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

/*
- Saves the auth store in localStorage under the key "auth".
- Automatically reads from localStorage when the app loads.
- Keeps it in sync, so any changes like auth.set() or auth.update() are reflected in localStorage instantly.
*/

type AuthUser = {
	token: string | null;
	isLoggedIn: boolean;
};

export const auth = persisted<AuthUser>('auth', {
	token: null,
	isLoggedIn: false
});
