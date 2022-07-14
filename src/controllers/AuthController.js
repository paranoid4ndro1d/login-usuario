const fs = require("fs");
const path = require("path");

const authController = {
  // Tela para cadastro do usuário
  register: (req, res) => {
    return res.render("register", {
      title: "Cadastro",
    });
  },
  // Processamento do cadastro do usuário
  create: (req, res) => {
    const usersJson = fs.readFileSync(
      // Caminho do arquivo
      path.join(__dirname, "..", "data", "users.json"),
      // Formato de leitura
      "utf-8"
    );
    const users = JSON.parse(usersJson);

    const { nome, sobrenome, apelido, email, senha, confirmar_senha } =
      req.body;
    if (
      !nome ||
      !sobrenome ||
      !apelido ||
      !email ||
      !senha ||
      !confirmar_senha
    ) {
      return res.render("register", {
        title: "Cadastro",
        error: {
          message: "Preencha todos os campos",
        },
      });
    }
    if(senha !== confirmar_senha){
      return res.render("register", {
        title: "Cadastro",
        error: {
          message: "Senhas não coincidem",
        },
      });
    }
  },
  // Tela para realizar login
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
    });
  },
  // Processamento do login
  auth: (req, res) => {},
  // Processamento do deslogar
  logout: (req, res) => {},
};

module.exports = authController;