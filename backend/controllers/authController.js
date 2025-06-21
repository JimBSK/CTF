const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailSender');

exports.forgotPassword = async (req, res) => {
  try {
    // 1. Поиск пользователя
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Пользователь не найден'
      });
    }

    // 2. Проверка лимита запросов
    if (!user.canRequestReset()) {
      return res.status(429).json({
        status: 'fail',
        message: 'Превышен лимит запросов. Попробуйте через 24 часа'
      });
    }

    // 3. Генерация токена
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 час
    user.passwordResetAttempts += 1;
    user.lastPasswordResetAttempt = Date.now();
    await user.save();

    // 4. Отправка email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Восстановление пароля',
      template: 'reset-password',
      context: {
        resetUrl,
        userName: user.name || 'Пользователь'
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Ссылка для сброса отправлена на email'
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка сервера'
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // 1. Хеширование токена
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    // 2. Поиск пользователя
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Токен недействителен или истек'
      });
    }

    // 3. Обновление пароля
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // 4. Отправка подтверждения
    await sendEmail({
      email: user.email,
      subject: 'Пароль изменен',
      template: 'password-changed'
    });

    res.status(200).json({
      status: 'success',
      message: 'Пароль успешно обновлен'
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка сервера'
    });
  }
};