import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  return Promise.all([userPromise, photoPromise])
    .then((results) => results.map((res) => ({
      status: 'fulfilled',
      value: res.value,
    })))
    .catch((error) => [{
      status: 'rejected',
      value: error.message,
    }]);
}
