import { createUser, uploadPhoto } from './utils';

export default async function asyncUploadUser() {
  const photoPromise = uploadPhoto();
  const userPromise = createUser();

  try {
    const photoRes = await photoPromise;
    const userRes = await userPromise;
    return {
      photo: photoRes,
      user: userRes,
    };
  } catch (error) {
    return {
      photo: null,
      user: null,
    };
  }
}
