import { onAuthStateChanged } from 'firebase/auth';
import { authG } from '../../firebase';

const checkAuth = (callback) => {
  return onAuthStateChanged(authG, (user) => {
    callback(user);
  });
};

export { checkAuth };