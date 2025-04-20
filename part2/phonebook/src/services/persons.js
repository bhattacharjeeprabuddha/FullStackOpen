import axios from "axios";

const baseUrl = "/api/persons";

// fetch all person resources from server
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// create new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

// delete person
const erase = (id, name) => {
  window.confirm(`Delete ${name} ?`);
  return axios.delete(`${baseUrl}/${id}`);
};

// update existinf person
const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then((response) => {
    response.data;
  });
};

export default { getAll, create, erase, update };
