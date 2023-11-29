import { createUser, uploadPhoto } from './utils';

export default function handleProfileSignup() {
  // Use Promise.all to wait for both promises to settle
  Promise.all([uploadPhoto(), createUser()])
    .then((results) => {
      console.log(`${results[0].body} ${results[1].firstName} ${results[1].lastName}`);
    })
    .catch(() => {
      // Handle errors from any of the promises
      console.log('Signup system offline');
    });
}
