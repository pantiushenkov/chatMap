import Snackbar from 'react-native-snackbar';

let showMessage = (message) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_LONG,
  });
};

export default showMessage;
