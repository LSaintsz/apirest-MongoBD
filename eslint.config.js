import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      // Mudamos de browser para node para o ESLint entender o seu backend
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    // Adicionamos esse bloco abaixo para você colocar as regras da sua videoaula
    rules: {
      // Exemplo: se quiser avisar sobre variáveis não usadas, adicionamos aqui:
      // "no-unused-vars": "warn"
    }
  },
]);