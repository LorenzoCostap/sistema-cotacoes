import { useEffect, useState } from "react";

function App() {

  // INDICADORES
  const [indicadores, setIndicadores] = useState([]);
  const [name, setName] = useState("");

  // COTAÇÕES
  const [cotacoes, setCotacoes] = useState([]);
  const [valor, setValor] = useState("");
  const [indicadorId, setIndicadorId] = useState("");

  // CARREGAR INDICADORES
  const carregarIndicadores = () => {
    fetch("http://localhost:8080/indicadores")
      .then((res) => res.json())
      .then((data) => setIndicadores(data));
  };

  // CARREGAR COTAÇÕES
  const carregarCotacoes = () => {
    fetch("http://localhost:8080/cotacoes")
      .then((res) => res.json())
      .then((data) => setCotacoes(data));
  };

  // INICIAR
  useEffect(() => {
    carregarIndicadores();
    carregarCotacoes();
  }, []);

  // CRIAR INDICADOR
  const criarIndicador = () => {

    if (!name) return;

    fetch("http://localhost:8080/indicadores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then(() => {

      setName("");
      carregarIndicadores();

    });

  };

  // DELETAR INDICADOR
  const deletarIndicador = (id) => {

    fetch(`http://localhost:8080/indicadores/${id}`, {
      method: "DELETE",
    }).then(() => carregarIndicadores());

  };

  // CRIAR COTAÇÃO
  const criarCotacao = () => {

    if (!valor || !indicadorId) return;

    const body = {
      valor: parseFloat(valor),
      dataHora: new Date().toISOString(),
      indicador: {
        id: parseInt(indicadorId),
      },
    };

    fetch("http://localhost:8080/cotacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {

      setValor("");
      setIndicadorId("");

      carregarCotacoes();

    });

  };

  // DELETAR COTAÇÃO
  const deletarCotacao = (id) => {

    fetch(`http://localhost:8080/cotacoes/${id}`, {
      method: "DELETE",
    }).then(() => carregarCotacoes());

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Sistema de Cotações</h1>

      <hr />

      <h2>Indicadores</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do indicador"
      />

      <button onClick={criarIndicador}>
        Criar
      </button>

      <ul>
        {indicadores.map((i) => (
          <li key={i.id}>

            {i.name}

            <button
              onClick={() => deletarIndicador(i.id)}
              style={{ marginLeft: "10px" }}
            >
              X
            </button>

          </li>
        ))}
      </ul>

      <hr />

      <h2>Cotações</h2>

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <select
        value={indicadorId}
        onChange={(e) => setIndicadorId(e.target.value)}
        style={{ marginLeft: "10px" }}
      >

        <option value="">
          Selecione
        </option>

        {indicadores.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}

      </select>

      <button
        onClick={criarCotacao}
        style={{ marginLeft: "10px" }}
      >
        Criar Cotação
      </button>

      <ul>
        {cotacoes.map((c) => (
          <li key={c.id}>

            {c.indicador?.name} - R$ {c.valor}

            <button
              onClick={() => deletarCotacao(c.id)}
              style={{ marginLeft: "10px" }}
            >
              X
            </button>

          </li>
        ))}
      </ul>

      <hr />

      <h2>Gráfico Simples</h2>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "20px",
          height: "300px",
          border: "1px solid gray",
          padding: "20px",
          marginTop: "20px"
        }}
      >

        {cotacoes.map((c) => (

          <div
            key={c.id}
            style={{
              width: "80px",
              height: `${c.valor / 20}px`,
              backgroundColor: "blue",
              color: "black",
              textAlign: "center",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "5px"
            }}
          >
            {c.valor}
          </div>

        ))}

      </div>

    </div>

  );
}

export default App;