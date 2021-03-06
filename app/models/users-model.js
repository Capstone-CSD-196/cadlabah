const axios = require('axios').default;
const API_ENDPOINT = require('../apis/mockapi-endpoint');

const getUsers = (callback) => {
  axios.get(API_ENDPOINT.getUsers, {
    headers: {
      'Accept': 'application/json',
    },
  }).then((res) => {
    callback(res.data);
  });
};

module.exports = {
  getUsers,
};
