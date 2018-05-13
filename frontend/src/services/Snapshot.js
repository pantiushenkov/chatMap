import {AsyncStorage} from 'react-native';

export async function clear() {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.error('Error clearing peristed application state', e);
  }
}
