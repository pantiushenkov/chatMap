const generalError = {general: "Unexpected problem occurred"};

export const catchError = (res, errors = generalError, status = 200) => {
  res.status(status).send({errors});
};

export const sendResponse = (res, data) => {
  res.status(200).send({data});
};
