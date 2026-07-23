import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import manipulador404 from "../middlewares/manipulador404.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

    app.use(express.json(), livros, autores);

    app.use(manipulador404);
    
};



export default routes;