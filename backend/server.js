require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { httpServer, io } = require('./ws/server');
const authRoutes = require('./routes/authRoutes');
const configureSwagger = require('./config/swagger');

const app = express();

// 📦 Middleware
app.use(express.json());

// 📚 Swagger (после создания app, до запуска сервера)
configureSwagger(app);

// 🔗 Роуты
app.use('/api/v1/auth', authRoutes);

// 🗄️ MongoDB подключение
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ DB connected'))
.catch(err => console.error('❌ DB connection error:', err));

// 🔌 WebSocket логика
io.on('connection', (socket) => {
  console.log(`🟢 New WebSocket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });

  // Пример: можно расширить
  // socket.on('chatMessage', (data) => { ... });
});

// 🚀 Запуск HTTP + WebSocket сервера
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server (HTTP + WS) is running on port ${PORT}`);
});
