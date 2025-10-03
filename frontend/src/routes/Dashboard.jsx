import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-300 min-h-full p-8 rounded-3xl">
        <h1 className="text-center font-semibold text-2xl p-6">Seja bem-vindo ao Dashboard!</h1>
        <button 
          className="w-full bg-blue-600 text-white text-lg py-2 rounded-2xl hover:bg-blue-900 transition duration-300"
          onClick={irParaLogin} // Função para redirecionar
        >
          Sistema de Login
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
