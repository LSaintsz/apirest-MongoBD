import { livro } from "../models/index.js";
import autor from "../models/Autor.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

    // static -> usar metodos sem precisar instanciar a classe.
    static async listarLivros(req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findById(id)
                .populate("autor", "nome")
                .exec();

            if (livroResultado !== null) {
                res.status(200).send(livroResultado);
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        try {
            let autorEncontrado = null;

            // 1. Busca o autor apenas se a chave 'autor' existir no corpo da requisição
            if (novoLivro.autor) {
                autorEncontrado = await autor.findById(novoLivro.autor);
            }

            // 2. Define a estrutura do livro para a validação
            let livroCompleto = novoLivro;

            if (autorEncontrado) {
                livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            }

            // 3. O Mongoose tenta criar e valida todos os campos obrigatórios de uma vez
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado });

        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findByIdAndUpdate(id, { $set: req.body });

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async excluirLivro(req, res, next) {
        try {
            const id = req.params.id;

            const livroResultado = await livro.findByIdAndDelete(id);

            if (livroResultado !== null) {
                res.status(200).send({ message: "Livro removido com sucesso" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static async listarLivrosPorFiltro(req, res, next) {
        const { editora, titulo } = req.query;


        const busca = {};

        if (editora) {
            busca.editora = editora;
        }

        if (titulo) {
            busca.titulo = { $regex: titulo, $options: "i" }; // Busca por título com regex, ignorando maiúsculas/minúsculas
        }

        try {
            const livrosPorEditora = await livro.find(busca);
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            next(erro);
        }
    }

}

export default LivroController;