import { useEffect, useState } from "react";

function App() {
  const [indicadores, setIndicadores] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);

  const [novoIndicador, setNovoIndicador] = useState("");
  const [valorCotacao, setValorCotacao] = useState("");
  const [indicadorSelecionado, setIndicadorSelecionado] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  const buscarIndicadores = () => {
    fetch("http://localhost:8080/indicadores")
      .then((res) => res.json())
      .then((dados) => setIndicadores(dados));
  };

  const buscarCotacoes = () => {
    fetch("http://localhost:8080/cotacoes")
      .then((res) => res.json())
      .then((dados) => setCotacoes(dados));
  };

  useEffect(() => {
    buscarIndicadores();
    buscarCotacoes();
  }, []);

  const adicionarIndicador = () => {
    if (!novoIndicador.trim()) {
      alert("Informe um nome para o indicador.");
      return;
    }

    fetch("http://localhost:8080/indicadores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: novoIndicador,
      }),
    }).then(() => {
      setNovoIndicador("");
      buscarIndicadores();
    });
  };

  const removerIndicador = (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir este indicador?"
    );

    if (!confirmar) return;

    fetch(`http://localhost:8080/indicadores/${id}`, {
      method: "DELETE",
    }).then(() => {
      buscarIndicadores();
    });
  };

  const adicionarCotacao = () => {
    if (!valorCotacao || !indicadorSelecionado) {
      alert("Preencha todos os campos.");
      return;
    }

    const dados = {
      valor: parseFloat(valorCotacao),
      dataHora: new Date().toISOString(),
      indicador: {
        id: parseInt(indicadorSelecionado),
      },
    };

    fetch("http://localhost:8080/cotacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    }).then(() => {
      setValorCotacao("");
      setIndicadorSelecionado("");
      buscarCotacoes();
    });
  };

  const removerCotacao = (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta cotação?"
    );

    if (!confirmar) return;

    fetch(`http://localhost:8080/cotacoes/${id}`, {
      method: "DELETE",
    }).then(() => {
      buscarCotacoes();
    });
  };

  const calcularAlturaBarra = (valor) => {
    return valor / 20;
  };

  const indicadoresFiltrados = indicadores.filter((item) =>
    item.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Acompanhamento de Indicadores</h1>

      <hr />

      <h2>Indicadores</h2>

      <input
        value={novoIndicador}
        onChange={(e) => setNovoIndicador(e.target.value)}
        placeholder="Nome do indicador"
      />

      <button onClick={adicionarIndicador}>
        Adicionar
      </button>

      <br />
      <br />

      <input
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Pesquisar indicador..."
      />

      {indicadores.length === 0 && (
        <p>Nenhum indicador cadastrado.</p>
      )}

      <ul>
        {indicadoresFiltrados.map((item) => (
          <li key={item.id}>
            {item.name}

            <button
              onClick={() => removerIndicador(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Cotações</h2>

      <input
        type="number"
        placeholder="Valor"
        value={valorCotacao}
        onChange={(e) => setValorCotacao(e.target.value)}
      />

      <select
        value={indicadorSelecionado}
        onChange={(e) => setIndicadorSelecionado(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">
          Selecione um indicador
        </option>

        {indicadores.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button
        onClick={adicionarCotacao}
        style={{ marginLeft: "10px" }}
      >
        Registrar Cotação
      </button>

      {cotacoes.length === 0 && (
        <p>Nenhuma cotação cadastrada.</p>
      )}

      <ul>
        {cotacoes.map((item) => (
          <li key={item.id}>
            {item.indicador?.name} - R$ {item.valor}

            <button
              onClick={() => removerCotacao(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Evolução das Cotações</h2>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "15px",
          height: "300px",
          border: "1px solid #ccc",
          padding: "20px",
          overflowX: "auto",
        }}
      >
        {cotacoes.map((item) => (
          <div
            key={item.id}
            style={{
              width: "70px",
              height: `${calcularAlturaBarra(item.valor)}px`,
              backgroundColor: "#2563eb",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingBottom: "5px",
              borderRadius: "4px",
            }}
          >
            {item.valor}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;