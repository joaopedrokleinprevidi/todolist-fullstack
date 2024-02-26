// Os middlewares FAZEM AS VERIFICAÇÕES

const validateBody = (request, response, next) => {
  const { body } = request;

  //AQUI SE O CORPO DA NOSSA APLICAÇÃO NÃO TIVER TITULO, RETORNA ISTO.
  if (body.titulo === undefined) {
    response
      .status(400)
      .json({ message: 'Erro: O campo "titulo" é obrigatório' });
  }

  if (body.titulo === "") {
    return response
      .status(400)
      .json({ message: "Erro: titulo não pode ser vazio" });
  }

  // Se não cair em nenhuma das validações acima ^^^
  //Significa que o título é válido, entao usamos a função abaixo para prosseguir com a requisição/resposta

  next();
};

const validateStatus = (request, response, next) => {
  const { body } = request;

  //AQUI SE O CORPO DA NOSSA APLICAÇÃO NÃO TIVER TITULO, RETORNA ISTO.
  if (body.status === undefined) {
    response
      .status(400)
      .json({ message: 'Erro: O campo "status" é obrigatório' });
  }

  if (body.status === "") {
    return response
      .status(400)
      .json({ message: "Erro: status não pode ser vazio" });
  }
};

module.exports = {
  validateBody,
  validateStatus,
};
