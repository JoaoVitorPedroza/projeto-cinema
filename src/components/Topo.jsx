// src/components/Topo.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// Importe a imagem aqui
import logoCine from '../assets/logo_do_cine.png'; // Caminho para sua imagem

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 67px;
  background-color: #ee897f;
  color: #fadbc5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px; /* Adicionado padding para evitar que a seta ou logo fiquem muito na borda */
`;

const BackButton = styled.div`
  position: absolute;
  left: 20px;
  font-size: 30px;
  color: #E8833A;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    filter: brightness(1.2);
  }
`;

// Estilo para a imagem da logo
const CineflexLogo = styled.img`
  height: 50px; /* Ajuste a altura da logo. Use um valor um pouco maior que o texto, se desejar */
  margin-right: 10px; /* Espaço entre a logo e o texto "Cineflex" */
`;

function Topo() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBackButton = location.pathname !== '/';

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={handleGoBack}>
          &#x2190;
        </BackButton>
      )}
      <CineflexLogo src={logoCine} alt="Logo Cineflex" /> {/* Adicione a imagem aqui */}
      CINEFLEX
    </HeaderContainer>
  );
}

export default Topo;