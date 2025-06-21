const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

// 1. Настройка транспорта
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'Gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// 2. Настройка шаблонизатора
transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'templates/layouts'),
    partialsDir: path.join(__dirname, 'templates/partials'),
    defaultLayout: 'main'
  },
  viewPath: path.join(__dirname, 'templates'),
  extName: '.hbs'
}));

// 3. Функция отправки
module.exports = {
  sendEmail: async ({ email, subject, template, context }) => {
    try {
      await transporter.sendMail({
        from: `"CTF Platform" <${process.env.EMAIL_FROM || process.env.EMAIL_USERNAME}>`,
        to: email,
        subject,
        template,
        context
      });
      return true;
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }
};