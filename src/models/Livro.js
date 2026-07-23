import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
import autor from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
                type: String
                , required: [true, "O título do livro é obrigatório"] },
    editora: { 
        type: String,
        required: [true, "A editora é obrigatória"],
        enum: {
            values: ["Casa do código", "Alura", "Classicos"],
            message: "A editora {VALUE} não é um valor permitido"
        }
    },
    preco: { type: Number},
    paginas: { 
        type: Number, 
        validate: {
            validator: (valor) => {
            return valor>=10 && valor<=5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) autor(a) é obrigatório"]
    }
}, { versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;

