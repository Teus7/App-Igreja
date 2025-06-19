const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const membroRoutes = require('./routes/membroRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', membroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});