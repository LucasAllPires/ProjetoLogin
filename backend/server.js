const express = require("express")
const fs = require("fs"); // file system (manipula arquivos)
const path = require("path"); // caminho do arquivo do banco
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { json } = require("stream/consumers");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Criar uma string para renovar a chave de autenticação
const secret_key = "123456"

// Local onde está o arquivo do seu banco de dados
const localDados = path.join(__dirname, 'data/usuario.json');

// Função para ler os dados do arquivo
const consultarUsuarios=()=>{
    const data = fs.readFileSync(localDados, "utf-8")
    return JSON.parse(data);
}

// Função para gravar dados no arquivo
const salvarUsuarios =()=>{
    fs.writeFileSync(localDados, JSON.stringify(users, null, 2));
}


// Rota para registrar usuário
app.post("/register", async(req, res)=>{
    const {email,senha} = req.body;

    if(!email || !senha){
        return res.status(400).json({message: "Campos obrigatórios"})
    }
    const users = consultarUsuarios();
    if(users.find(user=>user.email == email)){
        return res.status(400).json({message: "Email já cadastrado no banco de dados"})
    }
    //Criptografar a senha
    const hashSenha = await bcrypt.hash(senha, 10)
    const novoUsuario = {id:Date,now, email, senha:hashSenha}
    users.push(novoUsuario);
    salvarUsuarios(users);
    res.status(200).json({message: "Usuário registrado com sucesso."})
})

// Rota do login
app.post("/login", async (req,res)=>{
    const {email, senha}= req.body;
    const users = consultarUsuarios();
    const user = users.find(user=>user.email === email);

    if(!user){
        return res.status(400).json({message:"Senha inválida."})
    }
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if(!senhaValida){A
        return res.status(400).json({message:"Senha inválida."})
    }
    // Autenticação do Login
    const token = jwt.sign({id:user.id, email:user.email}, SECRET_KEY,{expiresIn:"10m"});
    res.json({message:"Login realizado com sucesso", token})
})

app.listen(port,()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})