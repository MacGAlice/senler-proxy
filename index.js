const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const METRIKA_ID = '65411641'; // ID счётчика Метрики
const GOAL_NAME = 'message_sent'; // Название цели в Метрике

function sendGoalToMetrika(goalName) {
  axios.get(`https://mc.yandex.ru/watch/${METRIKA_ID}`, {
    params: {
      'site-info': `goal:${goalName}`,
      'page-url': 'https://example.com', // если нет домена — оставь так
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

app.get('/status', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.post('/senler-webhook', (req, res) => {
  console.log('Получено событие от Senler:', req.body);

  if (req.body.type === 'message') {
    sendGoalToMetrika(GOAL_NAME);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
