import { createUser, uploadPhoto } from './utils';

export default function handleProfileSignup() {
  const photoPromise = uploadPhoto();
  const userPromise = createUser();

  // Use Promise.all to wait for both promises to settle
  Promise.all([photoPromise, userPromise])
    .then((results) => {
      const [photoRes, userRes] = results;
      console.log(photoRes.body, userRes.firstName, userRes.lastName);
    })
    .catch(() => {
      // Handle errors from any of the promises
      console.log('Signup system offline');
    });
}
