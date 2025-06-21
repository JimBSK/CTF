import axios from 'axios';

export default {
  login: async (username, password) => {
    console.log('Отправка запроса на сервер');
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });
      console.log('Ответ сервера:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка API:', {
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }
};