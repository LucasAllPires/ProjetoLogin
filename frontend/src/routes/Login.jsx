import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

const Login = () => {
  //HOOK - useState - manipula o estado da variável
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  //HOOK - useNavigate - redirecionamento entre os componentes
  const navigate = useNavigate();

  // FUNLÇAO HANDLELOGIN

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const token = response.data.token;

      if (token) {
        // pega o token do localstorage para valida o login
        localStorage.setItem("token", token);
        // caso o token esteja correto apresenta mensagem
        setMensagem("Login realizado com sucesso");
        //depois de 1 segundo chama a página dashboard
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMensagem("Erro autenticar token");
      }
    } catch (erro) {
      console.error("Erro ao logar", erro);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md mb-3 w-full max-w-sm">
        <h2 className="text-2xl text-black text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-green-950 font-bold italic">Email</label>
            <input
              type="email"
              placeholder = "Digite seu email: "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-950 font-bold italic" >Senha</label>
        
            <input
              type="password"
              placeholder="Digite sua senha: "
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button className="w-full bg-green-600 text-white text-lg py-2 rounded-2xl hover:bg-green-800 transition duration-300">
            Entrar
          </button>
        </form>
        {<p className="mt-4 text-center text-red-500">{mensagem}</p>}
        <p className="mt-4 text-center">
          Não tem conta ? <a href="/register" className="text-green-500 hover:underline">Criar Conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
