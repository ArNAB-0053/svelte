import { writable } from 'svelte/store';

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export const user = writable<User | null>(null);
