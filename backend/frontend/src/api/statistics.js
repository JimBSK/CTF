import axios from 'axios';

export default {
  getStatistics: (params) => axios.get('/api/stats', { params }),
};