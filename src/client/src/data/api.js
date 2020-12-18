import axios from 'axios';

const url = 'http://localhost:8080';

export const getEvents = () => {
  return axios.get(url + '/data/events').then(response => response.data);
};

export const getPromotions = () => {
  return axios.get(url + '/data/promotions').then(response => response.data);
};

export const submitData = (data) => {
  return axios.request({
    url: url + '/promotions',
    method: 'POST',
    headers: {
      ACCEPT: 'application/json'
    },
    data: data
  }).then(response => response.data);
};

