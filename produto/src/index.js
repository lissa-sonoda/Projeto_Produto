const express = require("express");
const app = express();
app.use(express.json());

let id = 0;
let produtos = [];

//método para obter os produtos
app.get("/produto", (req, res, next) => {
  res.send(produtos);
});

//método para inserir
app.put("/produto", (req, res, next) => {
  const produto = {
    id: (id += 1),
    nome: req.body.nome,
    unidade: req.body.unidade,
    valor: req.body.valor,
  };
  produtos.push(produto);
  res.status(201).json(produtos);
});

//método para atualizar
app.post("/produto", (req, res, next) => {
  produtos.forEach((produto) => {
    if (produto.id === req.body.id) {
      (produto.nome = req.body.nome),
        (produto.unidade = req.body.unidade),
        (produto.valor = req.body.valor);
    }
  });
  res.status(200).json(produtos);
});

//método de exclusão
app.delete("/produto/:id", (req, res) => {
  const idProdDelete = req.params.id;
  produtos.forEach((produto, index) => {
    if (produto.id == idProdDelete) produtos.splice(index, 1);
  });
  return res.sendStatus(200);
});

//porta
app.listen(5000, () => {
  console.log("Produtos. Na porta 5000.");
});
