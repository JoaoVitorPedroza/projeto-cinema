// src/pages/SelecioneHorario.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

// Componentes estilizados para a página de sessões
const SessionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  margin: 40px 0 20px;
  text-align: center;
`;

const MovieDayContainer = styled.div`
  margin-bottom: 23px;
  width: 100%; /* Ajuste a largura conforme o Figma */
  h2 {
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    margin-bottom: 22px;
  }
`;

const ShowtimesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Espaçamento entre os botões de horário */
`;

const ShowtimeButton = styled(Link)`
  width: 83px;
  height: 43px;
  background: #E8833A; /* Cor do botão de horário no Figma */
  border-radius: 3px;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  text-decoration: none; /* Remove sublinhado do link */
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

const FooterBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 117px;
    background-color: #DFE6ED;
    border-top: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    padding: 0 10px;

    img {
        width: 64px;
        height: 89px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 8px;
        margin-right: 14px;
    }

    div {
        color: #293845;
        font-size: 26px;
        line-height: 30px;
    }
`;
function SelecioneHorario() {
  const { idFilme } = useParams();
  const [filmeDetalhes, setFilmeDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setFilmeDetalhes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.error("Erro ao buscar sessões do filme:", err);
      });
  }, [idFilme]);

  if (loading) return <PageTitle>Carregando sessões...</PageTitle>;
  if (error) return <PageTitle>Erro ao carregar sessões: {error.message}</PageTitle>;
  if (!filmeDetalhes || !filmeDetalhes.days || filmeDetalhes.days.length === 0) {
    return <PageTitle>Nenhuma sessão disponível para este filme.</PageTitle>;
  }

  return (
    <SessionPageContainer>
      <PageTitle>Selecione o horário</PageTitle>

      {filmeDetalhes.days.map(day => (
        <MovieDayContainer key={day.id}>
          <h2>{day.weekday} - {day.date}</h2>
          <ShowtimesContainer>
            {day.showtimes.map(showtime => (
              <ShowtimeButton key={showtime.id} to={`/assentos/${showtime.id}`}>
                {showtime.name}
              </ShowtimeButton>
            ))}
          </ShowtimesContainer>
        </MovieDayContainer>
      ))}
      <FooterBar>
        <img src={filmeDetalhes.posterURL} alt={filmeDetalhes.title} />
        <div>
          <p>{filmeDetalhes.title}</p>
        </div>
      </FooterBar>
    </SessionPageContainer>
  );
}

export default SelecioneHorario;