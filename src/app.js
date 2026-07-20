import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";


/* import livro from "./models/Livro.js"; */



const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!")
})

const app = express();
routes(app);

/* app.get("/", (req, res)=>{
    res.status(200).send("Curso de Node.js");
}); */

/* app.get("/livros", async (req,res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
}); */

/* app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("livro cadastrado com sucesso!")
});

app.put("/livros/:id", (req, res) =>{   // sempre lembrar dos dois pontos.
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros); 
}); */

/* app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("livro removido com sucesso");
});
 */
// lembrar do status 200 e status 201.


export default app;

//mongodb+srv://leosantosfig03_db_user:<db_password>@aula-mongo.ag0kj23.mongodb.net/?appName=aula-mongo