const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../data/membros.json');

// Função para ler membros do arquivo JSON
function lerMembros() {
  try {
    const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    return [];
  }
}

// Função para salvar membros no arquivo JSON
function salvarMembros(membros) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(membros, null, 2));
}

// Listar todos os membros
const listarMembros = (req, res) => {
  const membros = lerMembros();
  res.json(membros);
};

// Cadastrar novo membro
const cadastrarMembro = (req, res) => {
  const membros = lerMembros();
  const novo = req.body;
  novo.id = Date.now();
  membros.push(novo);
  salvarMembros(membros);
  res.status(201).json(novo);
};

// Listar aniversariantes do mês atual
const listarAniversariantes = (req, res) => {
  const membros = lerMembros();
  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;

  const aniversariantesDoMes = membros.filter(m => {
    if (!m.aniversario) return false;
    const mesAniversario = parseInt(m.aniversario.split('-')[1], 10);
    return mesAniversario === mesAtual;
  });

  res.json(aniversariantesDoMes);
};

// Atualizar dados do membro
const atualizarMembro = (req, res) => {
  const membros = lerMembros();
  const id = parseInt(req.params.id);
  const index = membros.findIndex(m => m.id === id);

  if (index === -1) return res.status(404).json({ error: 'Membro não encontrado' });

  // Atualiza as propriedades
  membros[index] = {
    ...membros[index],
    ...req.body,
    id // mantém o id original
  };

  salvarMembros(membros);
  res.json(membros[index]);
};

// Deletar membro pelo id
const deletarMembro = (req, res) => {
  let membros = lerMembros();
  const id = parseInt(req.params.id);
  const index = membros.findIndex(m => m.id === id);

  if (index === -1) return res.status(404).json({ error: 'Membro não encontrado' });

  membros.splice(index, 1);
  salvarMembros(membros);
  res.json({ mensagem: 'Membro excluído com sucesso' });
};

module.exports = {
  listarMembros,
  cadastrarMembro,
  listarAniversariantes,
  atualizarMembro,
  deletarMembro,
};
