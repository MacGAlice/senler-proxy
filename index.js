const express = require('express');
const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Сервер запущен');
});
app.use(express.json()); // если ещё не добавлено

app.post('/senler-webhook', (req, res) => {
  console.log('Получено событие от Senler:', req.body);
  res.sendStatus(200);
});
