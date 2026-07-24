import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => {
        return valor.trim().length > 0;
    },
    message: ({ path }) => `O campo '${path}' não pode ser vazio.`
});
