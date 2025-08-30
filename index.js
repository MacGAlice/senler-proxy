const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const METRIKA_ID = '65411641'; // твой ID счётчика
const METRIKA_URL = `https://mc.yandex.ru/watch/${METRIKA_ID}`;

// Функция отправки цели
function sendGoalToMetrika(goalName) {
  axios.get(METRIKA_URL, {
    params: {
      'site-info': `goal:${goalName}`,
      'page-url': 'https://senler-proxy.onrender.com', // твой домен
      'charset': 'utf-8',
      'ut': 'noindex',
      'browser-info': `ti:1:cl:1:rn:${Math.random()}`
    }
  }).then(() => {
    console.log(`Цель "${goalName}" отправлена в Метрику`);
  }).catch(err => {
    console.error('Ошибка при отправке цели:', err.message);
  });
}

// Статус сервера
app.get('/status', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

// Обработка вебхука от Senler
app.post('/senler-webhook', (req, res) => {
  console.log('Получено событие от Senler:', req.body);

  // Если пользователь написал сообщение
  if (req.body.message && req.body.message.text) {
    sendGoalToMetrika('message_sent');
  }

  // Если пользователь нажал кнопку
  if (req.body.callback_query && req.body.callback_query.data) {
    sendGoalToMetrika('button_clicked');
  }

  res.sendStatus(200);
});

// Запуск сервера
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
