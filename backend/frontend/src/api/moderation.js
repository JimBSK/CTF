import axios from 'axios';

export default {
  getPendingFlags: () => axios.get('/api/moderation/flags'),
  approveFlag: (id) => axios.post(`/api/moderation/flags/${id}/approve`),
  rejectFlag: (id, reason) => axios.post(`/api/moderation/flags/${id}/reject`, { reason }),
};