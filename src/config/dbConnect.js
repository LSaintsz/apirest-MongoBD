import mongoose from "mongoose";

async function conectaNaDatabase() {
    // IMPORTANTE: Substitua esta string abaixo pela URL exata que você copiou no Passo 1!
    const uri = process.env.DB_CONNECTION_STRING;

    try {
        await mongoose.connect(uri);
        console.log("Conectado ao MongoDB com sucesso!");
        return mongoose.connection;
    } catch (error) {
        console.error("Erro detalhado na conexão:", error);
        throw error;
    }
}

export default conectaNaDatabase;