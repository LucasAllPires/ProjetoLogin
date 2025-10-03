import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const irParaLogin = () => navigate("/");

  useEffect(() => {
    // Fetch que chama o arquivo json
    fetch("/produtos.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex flex-col items-baseline-center gap-6 p-6">
      <div className="bg-gray-300 p-8 rounded-3xl min-w-[260px]">
        <h1 className="text-center font-semibold text-2xl p-3">Seja bem-vindo!</h1>
        <button
          className="w-full bg-blue-600 text-white text-lg py-2 rounded-2xl hover:bg-blue-900 transition duration-300"
          onClick={irParaLogin}
        >
          Login
        </button>
      </div>


{/* Boxes dos produtos */}
      <div className="bg-white shadow-md rounded-3xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Produtos</h2>

        {error && <p className="text-red-600">Erro: {error}</p>}

        {products.length === 0 && !error ? (
          <p>Carregando produtos...</p>
        ) : (<ul className="space-y-6">
            {products.map((p) => (
              <li key={p.id} className="border p-4 rounded-lg hover:bg-gray-50">
                <p className="font-medium">{p.nome}</p>
                <p className="text-sm text-gray-600">Categoria: {p.categoria}</p>
                <p className="text-sm">Preço: R$ {p.preco.toFixed(2)}</p>
                <p className="text-sm">Quantidade: {p.quantidade}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
