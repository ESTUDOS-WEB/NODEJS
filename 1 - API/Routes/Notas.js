const { Router } = require("express");
const banco = require("../dataBase");

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.json(banco.notas);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const nota = banco.notas.filter((i) => i.id.toString() === id);

    if (nota.length > 0) res.json(nota);
    else res.status(404).json({ messagem: "Conteudo não foi encontrado." });
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const nota = req.body;
    let id = 0;
    banco.notas.forEach( i => {
      if(i.id > id) id = i.id;
    });
    nota.id = (id + 1);

    console.log(nota.id);

    banco.notas.push(nota);
    res.status(201).json({ messagem: "Cadastrado com sucesso!" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const nota = req.body;
    const id = req.params.id;
    const idX = banco.notas.findIndex((i) => i.id.toString() === id);

    nota.id = id;

    if (idX > -1) {
      banco.notas[idX] = nota;
      res.json({ messagem: "Atualizado com sucesso!" });
    } else res.status(404).json({ messagem: "Conteudo não foi encontrado." });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const idX = banco.notas.findIndex((i) => i.id.toString() === id);

    banco.notas.splice(idX, 1);

    if (idX > -1) res.status(204).end();
    else res.status(404).json({ messagem: "Conteudo não foi encontrado." });
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
