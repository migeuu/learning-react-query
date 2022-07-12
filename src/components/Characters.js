import React, { useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return await response.json();
  };

  const { data, status } = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true,
  });

  if (status === "loading") {
    return <div className="loading-container">Carregando...</div>;
  }

  if (status === "error") {
    return <div className="error">Erro</div>;
  }

  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} key={character.id} />
      ))}
      <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
        Anterior
      </button>
      <button
        disabled={!data.info.next}
        onClick={() => setPage((old) => old + 1)}
      >
        Próximo
      </button>
    </div>
  );
};

export default Characters;
