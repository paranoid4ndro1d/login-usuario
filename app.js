const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const indexRoute = require("./src/routes/indexRoute");
const authRoute = require("./src/routes/authRoute");

// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(methodOverride("_method"));
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());
// Converte requisição para formato que o json aceita
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: "senha" }));

// Configura pasta estática para acesso externo
app.use(express.static(path.join(__dirname, "public")));
// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", path.join(__dirname, "src", "views"));

app.use("/", indexRoute);
app.use("/", authRoute);

// Inicia o servidor
app.listen(port, () => {
  console.log("Estamos rodando em: http://localhost:" + port);
});