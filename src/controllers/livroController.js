import livro from "../models/Livro.js";
import autor from "../models/Autor.js";

class LivroController {

    // static -> usar metodos sem precisar instanciar a classe.
    static async listarLivros (req, res, next) { 
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivroPorId (req, res, next) { 
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarLivro (req, res, next) {
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

    static async atualizarLivro (req, res, next) { 
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado" });
        } catch (erro) {
            next(erro);
        }
    }

    static async excluirLivro (req, res, next) { 
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "livro excluído com sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            next(erro);
        }
    }

}

export default LivroController;