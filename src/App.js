import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  /**
   * Atualiza repositories com tudo que está cadastrado na API na primeira vez
      que executa
   */
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Chatroom",
      "url": "https://https://github.com/thays-bfc/chatroom",
      "techs": [
        "Java",
        "HTML"
      ],
      "likes": 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
