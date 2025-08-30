const express = require('express');
const app = express();
app.use(express.json());

app.post('/senler-webhook', (req, res) => {
  console.log('Событие от Senler:', req.body);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Сервер запущен');
});
