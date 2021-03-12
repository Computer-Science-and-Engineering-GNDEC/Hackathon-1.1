import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

interface Decoded {
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
}

export const checkAuth = async () => {
  try {
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
