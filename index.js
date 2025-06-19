const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//midlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
const membroRoutes = require('./routes/membroRoutes');
app.use('/api', membroRoutes);
app.use(membroRoutes);


// Rota base
app.get('/', (req, res) => {
  res.send('API Igreja funcionando!');
});


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

