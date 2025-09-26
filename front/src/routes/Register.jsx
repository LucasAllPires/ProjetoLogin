import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  // HOOK- useState
  const [email,setEmail]=useState('');
  const [senha,setSenha]=useState('');
  const [message, setMessage]=useState('');
  //HOOK- useNavigate - navega entre os componentes
  const navigate = useNavigate();

  // criando a função handleRegister

  const handleRegister =async(e)=>{
    e.preventDefault(); //Previne que a página faça loading
    try{
      // BUSCANDO A API COM A FUNÇÃO AXIOS
      const response = await axios.post("http://localhost:5001/register", {email,senha})
      setMessage(response.data.message) //apresenta uma mensagem
      setTimeout(()=>navigate("/login"),2000);
    }
    catch(erro){
      setMessage(erro.response.data.message || "Erro ao registar usuário")
    }
  };

  return (
<div>
      <div>
        <h2>Cadastro de usuário</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button>Cadastrar</button>
        </form>

         {message && {message}}
        <p >
         Já tem uma conta? <a href="/register" >Faça Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register