// Os middlewares FAZEM AS VERIFICAÇÕES

const validateBody = (request, response, next) => {
  const { body } = request;

  //AQUI SE O CORPO DA NOSSA APLICAÇÃO NÃO TIVER TITULO, RETORNA ISTO.
  if (body.title === undefined) {
    response
      .status(400)
      .json({ message: 'Erro: O campo "titulo" é obrigatório' });
  }

  if (body.title === "") {
    return response
      .status(400)
      .json({ message: "Erro: titulo não pode ser vazio" });
  }

  // Se não cair em nenhuma das validações acima ^^^
  //Significa que o título é válido, entao usamos a função abaixo para prosseguir com a requisição/resposta

  next();
};

module.exports = {
  validateBody,
};
