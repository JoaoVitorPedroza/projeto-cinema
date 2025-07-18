import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topo from './components/Topo';
import HomePage from './pages/HomePage';
import SelecioneHorario from './pages/SelecioneHorario';
import SelecioneAssento from './pages/Selecione(s)assento';
import PedidoFinalizado from './pages/PedidoFinalizado';

import styled from 'styled-components';
const ContentWrapper = styled.div`
  padding-top: 67px; /* Altura do seu header para que o conteúdo não fique escondido */
  padding-bottom: 117px; /* Altura do seu footer + espaço, se houver um footer fixo também */
  /* Adicione padding lateral se necessário, conforme o Figma */
  min-height: 100vh; /* Para garantir que o conteúdo preencha a tela */
`;
function App() {
  return (
    <BrowserRouter>
      <Topo />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sessoes/:idFilme" element={<SelecioneHorario />} />
          <Route path="/assentos/:idSessao" element={<SelecioneAssento />} />
          <Route path="/sucesso" element={<PedidoFinalizado />} />
        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  );
}
export default App;