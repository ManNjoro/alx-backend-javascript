import { createUser, uploadPhoto } from './utils';

export default function handleProfileSignup() {
  // Use Promise.all to wait for both promises to settle
  Promise.all([uploadPhoto(), createUser()])
    .then((results) => {
      const [photoRes, userRes] = results;
      console.log(photoRes.body, userRes.firstName, userRes.lastName);
    })
    .catch(() => {
      // Handle errors from any of the promises
      console.log('Signup system offline');
    });
}
