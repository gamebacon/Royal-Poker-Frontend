import { atom } from 'recoil';

export const currentUser = atom({
  key: 'currentUser', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
