import axios from './Axios';

export const post = (url, data) => (
  axios.post(url, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
);

