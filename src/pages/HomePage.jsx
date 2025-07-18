//removendo titulo
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filmes from '../components/Filmes';

const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px; /* Ajuste o padding lateral conforme o Figma */
  margin-top: 20px; /* Espaço abaixo do título da página */
  border: 1px #212226;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  color: #ffffff;
  margin: 40px 0 20px; /* Margem superior para afastar do header */
  text-align: center;
`;

function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const API_URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setFilmes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.error("Erro ao buscar filmes:", err);

      });
  }, []);

  if (loading) return <PageTitle>Carregando filmes...</PageTitle>;
  if (error) return <PageTitle>Erro ao carregar filmes: {error.message}. Por favor, tente novamente mais tarde.</PageTitle>;
  if (filmes.length === 0) return <PageTitle>Nenhum filme em cartaz no momento.</PageTitle>;

  return (
    <>
      <PageTitle>Em Cartaz</PageTitle>
      <MoviesGrid>
        {filmes.map(filme => (
          <Filmes
            key={filme.id}
            id={filme.id}
            posterUrl={filme.posterURL}
            title={filme.title}
          />
        ))}
      </MoviesGrid>
    </>
  );
}

export default HomePage;
