import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieCardContainer = styled(Link)` /* Link para navegar */
  width: 145px;
  height: 209px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px; /* Espaçamento interno para a imagem */
  margin: 10px; /* Margem entre os cards na grade */
  text-decoration: none; /* Remove sublinhado do link */
  color: inherit; /* Mantém a cor do texto padrão */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Para a imagem se ajustar sem cortar */
  }
`;

function Filmes({ id, posterUrl, title }) {
  return (
    <MovieCardContainer to={`/sessoes/${id}`}>
      <img src={posterUrl} alt={title} />
    </MovieCardContainer>
  );
}

export default Filmes; 