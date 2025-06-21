import axios from 'axios';

export default {
  getUsers: () => axios.get('/api/admin/users'),
  banUser: (id) => axios.post(`/api/admin/users/${id}/ban`),
  makeAdmin: (id) => axios.post(`/api/admin/users/${id}/promote`),
};