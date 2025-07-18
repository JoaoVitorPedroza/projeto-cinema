// src/pages/PedidoFinalizado.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom'; // useLocation para pegar o state, Link para voltar

// Componentes estilizados para a página de sucesso
const SuccessPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  min-height: calc(100vh - 67px); /* Considerando a altura do header */
`;

const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  color: #293845;
  margin: 40px 0 20px;
  text-align: center;
  color: #247A6B; /* Cor verde para "Pedido finalizado!" */
  font-weight: 700;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 330px; /* Ajuste conforme Figma */
  margin-bottom: 30px;

  h2 {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: #ee897f;
    font-weight: 700; /* Negrito para os títulos das seções */
    margin-bottom: 10px;
  }

  p {
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.04em;
    color: #ffffff;
    margin-bottom: 5px; /* Espaçamento entre as linhas */
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BackToHomeButton = styled(Link)`
  width: 225px;
  height: 42px;
  background: #E8833A;
  border-radius: 3px;
  border: none;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  text-decoration: none; /* Remove sublinhado do link */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 50px; /* Espaçamento antes do botão */
  &:hover {
    filter: brightness(1.1);
  }
`;

function PedidoFinalizado() {
  const location = useLocation();
  const { movieTitle, sessionDate, sessionTime, selectedSeatNumbers, buyerName, buyerCpf } = location.state || {};

  // Opcional: Efeito para rolar para o topo da página ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Se os dados não existirem (por exemplo, se o usuário tentar acessar /sucesso diretamente)
  if (!location.state) {
    return (
      <SuccessPageContainer>
        <PageTitle>Erro</PageTitle>
        <SectionContainer>
          <p>Nenhuma informação de pedido encontrada. Por favor, faça uma nova reserva.</p>
        </SectionContainer>
        <BackToHomeButton to="/">Voltar para Tela Inicial</BackToHomeButton>
      </SuccessPageContainer>
    );
  }

  return (
    <SuccessPageContainer>
      <PageTitle>Pedido finalizado!</PageTitle>

      <SectionContainer>
        <h2>Filme e sessão</h2>
        <p>{movieTitle}</p>
        <p>{sessionDate} às {sessionTime}</p>
      </SectionContainer>

      <SectionContainer>
        <h2>Ingressos</h2>
        {selectedSeatNumbers && selectedSeatNumbers.length > 0 ? (
          selectedSeatNumbers.map((seatNum, index) => (
            <p key={index}>Assento {seatNum}</p>
          ))
        ) : (
          <p>Nenhum assento selecionado.</p>
        )}
      </SectionContainer>

      <SectionContainer>
        <h2>Comprador(a)</h2>
        <p>Nome: {buyerName}</p>
        <p>CPF: {buyerCpf}</p>
      </SectionContainer>

      <BackToHomeButton to="/">Voltar para tela inicial</BackToHomeButton>
    </SuccessPageContainer>
  );
}

export default PedidoFinalizado;